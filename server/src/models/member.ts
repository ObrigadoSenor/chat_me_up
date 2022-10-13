import { Document, model, Schema } from "mongoose";
import { MemberType } from "../../__generated_types__/types";

const MemberSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
});

export const MembersSchema = new Schema({
  members: [MemberSchema],
  roomId: {
    type: String,
    required: true,
  },
});

export type MembersModelType = MemberType | Document;
export const Members = model<MembersModelType>("Members", MembersSchema);
