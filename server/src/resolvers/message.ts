import { HydratedDocument } from "mongoose";
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
import { last } from "ramda";

import { Error } from "../entities/error";
import { MessagesType, MessageType } from "../entities/message";

import { RoomType } from "../entities/room";
import { Messages, MessagesModelType } from "../models/message";

type idType = RoomType["_id"];
type nameType = MessageType["name"];
type messageType = MessageType["message"];

@Resolver()
export class MessageResolver {
  @Query(() => MessagesType)
  async getMessages(
    @Arg("_id") _id: idType
  ): Promise<MessagesModelType | Error> {
    const messages = await Messages.findOne<MessagesModelType>({ roomId: _id });

    if (!messages) {
      return { code: 500, message: `No chat with id ${_id}` };
    }
    return messages;
  }

  @Mutation(() => MessageType)
  async sendMessage(
    @PubSub("OnNewMessage") publish: Publisher<MessageType>,
    @Arg("_id") _id: idType,
    @Arg("name") name: nameType,
    @Arg("message") message: messageType
  ): Promise<MessageType | Error> {
    const messages = await Messages.findOneAndUpdate<MessagesType>(
      { roomId: _id },
      { $push: { messages: { name, message } } },
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
    console.log("on new message sub: ", props);
    return props;
  }
}
