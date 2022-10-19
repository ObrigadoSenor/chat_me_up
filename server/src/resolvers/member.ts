import { HydratedDocument } from "mongoose";
import { last } from "ramda";
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

import { MembersType, MemberType } from "./../entities/member";

import { Error } from "../entities/error";

import { ConversationType } from "../entities/conversation";
import { UserType } from "../entities/user";

import { MemberModelType, Members } from "./../models/member";

type conversationIdType = ConversationType["_id"];
type userIdType = UserType["_id"];

@Resolver()
export class MemberResolver {
  @Query(() => [MemberType])
  async getMembers(
    @Arg("_conversationId") _conversationId: conversationIdType
  ): Promise<MemberModelType[] | Error> {
    const members = await Members.findOne<MembersType>({
      _conversationId,
    });

    if (!members) {
      return {
        code: 500,
        message: `No members in room with id ${_conversationId}`,
      };
    }

    return members.members;
  }

  @Mutation(() => MemberType)
  async addMember(
    @PubSub("OnNewMember") publish: Publisher<MemberType>,
    @Arg("_conversationId") _conversationId: conversationIdType,
    @Arg("_userId") _userId: userIdType
  ): Promise<MemberType | Error> {
    const members = await Members.findOneAndUpdate<MembersType>(
      { _conversationId },
      { $push: { members: { _userId } } },
      { returnDocument: "after" }
    );
    if (!members) {
      return { code: 500, message: `Could'nt add member` };
    }
    const newlyAddedMember = last(members.members);
    if (newlyAddedMember === undefined) {
      return { code: 500, message: `Could'nt get the last member` };
    }

    await publish(newlyAddedMember);
    return newlyAddedMember;
  }

  @Mutation(() => MemberType)
  async removeMember(
    @PubSub("OnRemoveMember") publish: Publisher<MemberType>,
    @Arg("_conversationId") _conversationId: conversationIdType,
    @Arg("_userId") _userId: userIdType
  ): Promise<MemberType | Error> {
    const members = await Members.findOneAndUpdate<MembersType>(
      { _conversationId },
      { $pull: { members: { _userId } } },
      { returnOriginal: true }
    );

    if (!members) {
      return { code: 500, message: `No member was deleted` };
    }
    const newlyRemovedMember = last(members.members);
    if (newlyRemovedMember === undefined) {
      return { code: 500, message: `Could'nt get the last removed member` };
    }

    await publish(newlyRemovedMember);
    return newlyRemovedMember;
  }

  @Subscription({
    topics: "OnNewMember",
  })
  memberAdded(@Root() props: HydratedDocument<MemberType>): MemberType {
    return props;
  }

  @Subscription({
    topics: "OnRemoveMember",
  })
  memberRemoved(@Root() props: HydratedDocument<MemberType>): MemberType {
    return props;
  }
}
