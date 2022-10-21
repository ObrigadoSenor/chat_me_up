/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ConversationBasicType {
  @Field()
  _id: string;
  @Field()
  _conversationId: string;
}

@ObjectType()
export class ConversationType {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field()
  _membersId: string;
  @Field()
  _messagesId: string;
}
