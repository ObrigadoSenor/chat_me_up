/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class MessageType {
  @Field()
  _id: string;
  @Field()
  _userId: string;
  @Field()
  message: string;
}

@ObjectType()
export class MessagesType {
  @Field()
  _id: string;
  @Field()
  _conversationId: string;
  @Field(() => [MessageType])
  messages: [MessageType];
}
