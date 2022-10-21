import { model, Schema } from "mongoose";
import { FriendsType } from "../entities/friends";

export const FriendsUserSchema = new Schema({
  _userId: {
    type: String,
    required: true,
  },
});

const RequestdSchema = new Schema({
  _userId: {
    type: String,
    required: true,
  },
});

const PendingdSchema = new Schema({
  _userId: {
    type: String,
    required: true,
  },
});

const AcceptedSchema = new Schema({
  _userId: {
    type: String,
    required: true,
  },
});

const RejectedSchema = new Schema({
  _userId: {
    type: String,
    required: true,
  },
});

export const FriendsSchema = new Schema({
  _userId: {
    type: String,
    required: true,
  },
  pending: [PendingdSchema],
  requests: [RequestdSchema],
  accepted: [AcceptedSchema],
  rejected: [RejectedSchema],
});

export type FriendsModelType = FriendsType | Document;

export const Friends = model<FriendsModelType>("Friends", FriendsSchema);
