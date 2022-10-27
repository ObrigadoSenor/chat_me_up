import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class FriendsBasicType {
  @Field()
  _id: string;
  @Field()
  _userId: string;
}

@ObjectType()
export class FriendType {
  @Field()
  _id: string;
  @Field()
  _userId: string;
}

@ObjectType()
export class FriendsType {
  @Field()
  _id: string;
  @Field()
  _userId: string;
  @Field(() => [FriendType])
  pending: [FriendType];
  @Field(() => [FriendType])
  requests: [FriendType];
  @Field(() => [FriendType])
  accepted: [FriendType];
  @Field(() => [FriendType])
  rejected: [FriendType];
}
