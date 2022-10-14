import { Document, model, Schema } from "mongoose";
import { MessagesType } from "../entities/message";

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export const MessagesSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  messages: [MessageSchema],
});

export type MessagesModelType = MessagesType | Document;
export const Messages = model<MessagesModelType>("Messages", MessagesSchema);
