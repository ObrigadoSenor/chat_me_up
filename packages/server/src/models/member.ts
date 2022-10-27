import { Document, model, Schema } from "mongoose";
import { MembersType, MemberType } from "../entities/member";

const MemberSchema = new Schema({
  _userId: {
    type: String,
    required: true,
  },
});

export const MembersSchema = new Schema({
  members: [MemberSchema],
  _conversationId: {
    type: String,
    required: true,
  },
});

export type MemberModelType = MemberType | Document;
export type MembersModelType = MembersType | Document;
export const Members = model<MembersModelType>("Members", MembersSchema);
