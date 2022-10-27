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
export class ConversationAdminType {
  @Field()
  _id: string;
  @Field()
  _adminId: string;
}

@ObjectType()
export class ConversationType {
  @Field()
  _id: string;
  @Field({ nullable: true })
  name?: string;
  @Field()
  _membersId: string;
  @Field()
  _messagesId: string;
  @Field(() => [ConversationAdminType])
  _adminsIds: [ConversationAdminType];
}

@ObjectType()
export class ConversationReturnType {
  @Field()
  data: ConversationType;
  @Field(() => [String])
  membersIds: string[];
}
