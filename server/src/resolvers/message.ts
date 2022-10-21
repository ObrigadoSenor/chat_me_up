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

import { Error } from "../entities/error";
import { MessagesType, MessageType } from "../entities/message";

import { ConversationType } from "../entities/conversation";
import { MessageModelType, Messages } from "../models/message";

type conversationIdType = ConversationType["_id"];
type userIdType = MessageType["_userId"];
type messageType = MessageType["message"];

@Resolver()
export class MessageResolver {
  @Query(() => [MessageType])
  async getMessage(
    @Arg("_conversationId") _conversationId: conversationIdType
  ): Promise<[MessageType] | Error> {
    const messages = await Messages.findOne<MessagesType>({
      _conversationId,
    });
    console.log("messages", messages);

    if (!messages) {
      return { code: 500, message: `No chat with id ${_conversationId}` };
    }
    return messages.messages;
  }

  @Mutation(() => MessageType)
  async sendMessage(
    @PubSub("OnNewMessage") publish: Publisher<MessageType>,
    @Arg("_conversationId") _conversationId: conversationIdType,
    @Arg("_userId") _userId: userIdType,
    @Arg("message") message: messageType
  ): Promise<MessageModelType | Error> {
    const messages = await Messages.findOneAndUpdate<MessagesType>(
      { _conversationId },
      { $push: { messages: { _userId, message } } },
      { returnDocument: "after" }
    );

    if (!messages) {
      return { code: 500, message: `Could'nt add message` };
    }

    const newlyAddedMessage = last(messages.messages);
    if (newlyAddedMessage === undefined) {
      return { code: 500, message: `Could'nt get the last send message` };
    }

    await publish(newlyAddedMessage);
    return newlyAddedMessage;
  }

  @Subscription({
    topics: "OnNewMessage",
  })
  messageSent(@Root() props: HydratedDocument<MessageType>): MessageType {
    console.log("message sub: ", props);

    return props;
  }
}
