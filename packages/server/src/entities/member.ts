import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class MemberType {
  @Field()
  _id: string;
  @Field()
  _userId: string;
}

export class MembersType {
  @Field()
  _id: string;
  @Field()
  _conversationId: string;
  @Field(() => [MemberType])
  members: [MemberType];
}

@ObjectType()
export class MemberLeaveType {
  @Field()
  _userId: string;
  @Field()
  _conversationId: string;
}
