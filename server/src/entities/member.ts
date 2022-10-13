import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class MemberType {
  @Field()
  _id: string;
  @Field()
  username: string;
}
