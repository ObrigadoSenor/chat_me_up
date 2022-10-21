import { Document, model, Schema } from "mongoose";
import { ConversationType } from "../entities/conversation";

export const ConversationUserSchema = new Schema({
  _conversationId: {
    type: String,
    required: true,
  },
});

const ConversationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  _membersId: {
    type: String,
    required: true,
  },
  _messagesId: {
    type: String,
    required: true,
  },
});

export type ConversationModelType = ConversationType | Document;
export const Conversations = model<ConversationModelType>(
  "Conversations",
  ConversationSchema
);
