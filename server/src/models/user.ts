import { Document, model, Schema } from "mongoose";
import { UserBasicType, UserType } from "./../entities/user";
import { ConversationUserSchema } from "./conversation";
import { FriendsUserSchema } from "./friends";

export const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  conversations: [ConversationUserSchema],
  friends: FriendsUserSchema,
});

export type UserBasicModelType = UserBasicType | Document;
export type UserModelType = UserType & Document;
export const User = model<UserModelType>("Users", UserSchema);
