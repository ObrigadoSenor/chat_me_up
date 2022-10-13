import { Document, model, Schema } from "mongoose";
import { RoomType } from "../../__generated_types__/types";

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  membersId: {
    type: String,
    required: true,
  },
  messagesId: {
    type: String,
    required: true,
  },
});

export type RoomsModelType = RoomType | Document;
export const Rooms = model<RoomsModelType>("Rooms", RoomSchema);
