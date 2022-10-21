import { FriendsBasicType } from "./friends";
import { Field, ObjectType } from "type-graphql";
import { ConversationBasicType } from "./conversation";

@ObjectType()
export class UserBasicType {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field(() => [ConversationBasicType])
  conversations: [ConversationBasicType];
  @Field()
  friends: FriendsBasicType;
}

@ObjectType()
export class UserType extends UserBasicType {
  @Field()
  hash: string;
  @Field()
  salt: string;
  @Field()
  date: string;
  @Field()
  token: string;
}

@ObjectType()
export class UserAddType {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  confirmPassword: string;
}

@ObjectType()
export class ValidTokenType {
  @Field()
  expired: boolean;
}
