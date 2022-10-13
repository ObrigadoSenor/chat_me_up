/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Error {
  @Field()
  code: number;
  @Field()
  message: string;
}
