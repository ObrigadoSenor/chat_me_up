/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UserType {
  @Field()
  _id: string;
  @Field()
  username: string;
}
