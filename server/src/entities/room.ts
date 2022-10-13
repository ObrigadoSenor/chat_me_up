/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class RoomType {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field()
  membersId: string;
  @Field()
  messagesId: string;
}
