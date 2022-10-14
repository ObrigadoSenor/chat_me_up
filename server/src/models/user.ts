import { Document, model, Schema } from "mongoose";
import { UserType } from "./../entities/user";

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
});

export type UserModelType = UserType | Document;
export const User = model<UserModelType>("Users", UserSchema);
