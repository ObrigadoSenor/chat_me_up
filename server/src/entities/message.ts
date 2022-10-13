/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class MessageType {
  @Field()
  _id: string;
  @Field()
  message: string;
  @Field()
  name: string;
}

@ObjectType()
export class MessagesType {
  @Field()
  _id: string;
  @Field(() => [MessageType])
  messages: [MessageType];
  @Field()
  roomId: string;
}
