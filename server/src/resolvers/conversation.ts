import { UserType } from "./../../../client/__generated_types__/types";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HydratedDocument } from "mongoose";

import { map } from "ramda";
import {
  Arg,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import {
  ConversationReturnType,
  ConversationType,
} from "../entities/conversation";
import { Error } from "../entities/error";
import { MembersType, MemberType } from "../entities/member";
import { ConversationModelType, Conversations } from "../models/conversation";
import { Members } from "../models/member";
import { Messages } from "../models/message";
import { User, UserModelType } from "../models/user";

type nameType = ConversationType["name"];
type idType = ConversationType["_id"];
type userIdType = UserType["_id"];
type memberUserIdType = MemberType["_userId"];

@Resolver()
export class ConversationResolver {
  @Query(() => [ConversationType])
  async getConversations(
    @Arg("_userId") _userId: userIdType
  ): Promise<ConversationModelType[] | Error> {
    const user = await User.findOne<UserModelType>({ _id: _userId });

    if (!user) {
      return { code: 500, message: `No user could be found` };
    }

    const conversations = await Conversations.find<ConversationModelType>({
      _id: {
        $in: map(({ _conversationId }) => _conversationId, user.conversations),
      },
    });

    if (!conversations) {
      return { code: 500, message: `No conversations could be found` };
    }

    return conversations;
  }

  @Query(() => ConversationType)
  async joinConversation(
    @Arg("_conversationId") _conversationId: idType
  ): Promise<ConversationModelType | Error> {
    const conversation = await Conversations.findOne<ConversationModelType>({
      _id: _conversationId,
    });
    if (!conversation) {
      return {
        code: 500,
        message: `No conversation with name ${_conversationId}`,
      };
    }
    return conversation;
  }

  @Mutation(() => ConversationType)
  async addConversation(
    @PubSub("OnNewConversation")
    publish: Publisher<ConversationReturnType>,
    @Arg("name") name: nameType,
    @Arg("membersIds", () => [String]) membersIds: memberUserIdType[],
    @Arg("_userId") _userId: userIdType
  ): Promise<ConversationType | Error> {
    const conversationData = (await new Conversations({
      name,
      _messagesId: "placeholder",
      _membersId: "placeholder",
    }).save()) as ConversationModelType;
    const _conversationId = conversationData?._id;
    const { _id: _messagesId } = await new Messages({
      messages: [],
      _conversationId,
    }).save();

    const memberAndUser = [...membersIds, _userId];

    const members = map(
      (_userId) => ({
        _userId,
      }),
      memberAndUser
    );

    const { _id: _membersId } = await new Members({
      members,
      _conversationId,
    }).save();

    map(
      async (_id) =>
        await User.findOneAndUpdate(
          { _id },
          { $push: { conversations: { _conversationId } } }
        ),
      memberAndUser
    );

    const conversation = (await Conversations.findOneAndUpdate(
      { _id: _conversationId },
      { $set: { _messagesId, _membersId } },
      { returnDocument: "after" }
    )) as ConversationType;

    await publish({ data: conversation, membersIds: memberAndUser });
    return conversation;
  }

  @Mutation(() => ConversationType)
  async deleteConversation(
    @PubSub("OnDeleteConversation") publish: Publisher<ConversationReturnType>,
    @Arg("_conversationId") _conversationId: idType
  ): Promise<ConversationType | Error> {
    const conversation = await Conversations.findOneAndRemove<ConversationType>(
      { _id: _conversationId },
      { returnDocument: "after" }
    );
    if (!conversation) {
      return { code: 500, message: `No conversation was deleted` };
    }
    await Messages.deleteOne({ _conversationId: conversation._id });
    const members = await Members.findOneAndRemove<MembersType>(
      { _conversationId: conversation._id },
      { returnDocument: "after" }
    );
    if (members) {
      map(
        async ({ _userId }) => {
          return await User.findOneAndUpdate(
            { _id: _userId },
            { $pull: { conversations: { _conversationId } } }
          );
        },

        members.members || []
      );
    }

    await publish({
      data: conversation,
      membersIds: map((member) => member._userId, members?.members || []),
    });
    return conversation;
  }

  @Subscription(() => ConversationReturnType, {
    topics: "OnNewConversation",
  })
  conversationAdded(
    @Root()
    props: HydratedDocument<ConversationReturnType>
  ): ConversationReturnType {
    return props;
  }

  @Subscription(() => ConversationReturnType, {
    topics: "OnDeleteConversation",
  })
  conversationDeleted(
    @Root() props: HydratedDocument<ConversationReturnType>
  ): ConversationReturnType {
    return props;
  }
}
