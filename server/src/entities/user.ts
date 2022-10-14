/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UserBasicType {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field()
  email: string;
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
