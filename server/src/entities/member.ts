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
