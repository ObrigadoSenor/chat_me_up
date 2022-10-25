import { Document, model, Schema } from "mongoose";
import { ConversationType } from "../entities/conversation";

export const ConversationAdminSchema = new Schema({
  _adminId: {
    type: String,
    required: true,
  },
});

export const ConversationUserSchema = new Schema({
  _conversationId: {
    type: String,
    required: true,
  },
});

const ConversationSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  _membersId: {
    type: String,
    required: true,
  },
  _messagesId: {
    type: String,
    required: true,
  },
  _adminsIds: [ConversationAdminSchema],
});

export type ConversationModelType = ConversationType | Document;
export const Conversations = model<ConversationModelType>(
  "Conversations",
  ConversationSchema
);
