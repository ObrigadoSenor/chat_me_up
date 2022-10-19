import { Document, model, Schema } from "mongoose";
import { ConversationType } from "../entities/conversation";

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
