import { Document, model, Schema } from "mongoose";
import { MessagesType, MessageType } from "../entities/message";

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  _userId: {
    type: String,
    required: true,
  },
});

export const MessagesSchema = new Schema({
  _conversationId: {
    type: String,
    required: true,
  },
  messages: [MessageSchema],
});

export type MessageModelType = MessageType | Document;
export type MessagesModelType = MessagesType | Document;
export const Messages = model<MessagesModelType>("Messages", MessagesSchema);
