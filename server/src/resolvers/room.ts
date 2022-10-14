/* eslint-disable @typescript-eslint/no-unused-vars */
import { HydratedDocument } from "mongoose";

import {
  Arg,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Error } from "../entities/error";
import { RoomType } from "../entities/room";
import { Members } from "../models/member";
import { Messages } from "../models/message";
import { Rooms, RoomsModelType } from "../models/room";

type nameType = RoomType["name"];
type idType = RoomType["_id"];

@Resolver()
export class RoomResolver {
  @Query(() => [RoomType])
  async getRooms(): Promise<RoomsModelType[] | Error> {
    const room = await Rooms.find<RoomsModelType>();
    if (!room) {
      return { code: 500, message: `No rooms could be found` };
    }
    return room;
  }

  @Query(() => RoomType)
  async joinRoom(@Arg("_id") _id: idType): Promise<RoomsModelType | Error> {
    const room = await Rooms.findOne<RoomsModelType>({ _id });
    if (!room) {
      return { code: 500, message: `No room with name ${_id}` };
    }
    return room;
  }

  @Mutation(() => RoomType)
  async sendRoom(
    @PubSub("OnNewRoom") publish: Publisher<RoomsModelType>,
    @Arg("name") name: nameType
  ): Promise<RoomsModelType | Error> {
    const roomData = (await new Rooms({
      name,
      messagesId: "placeholder",
      membersId: "placeholder",
    }).save()) as RoomsModelType;

    const { _id: messagesId } = await new Messages({
      messages: [],
      roomId: roomData?._id,
    }).save();

    const { _id: membersId } = await new Members({
      members: [],
      roomId: roomData?._id,
    }).save();

    const room = (await Rooms.findOneAndUpdate(
      { _id: roomData?._id },
      { $set: { messagesId, membersId } },
      { returnDocument: "after" }
    )) as RoomsModelType;

    await publish(room);
    return room;
  }

  @Mutation(() => RoomType)
  async deleteRoom(
    @PubSub("OnDeleteRoom") publish: Publisher<RoomsModelType>,
    @Arg("_id") _id: idType
  ): Promise<RoomsModelType | Error> {
    const room = await Rooms.findOneAndRemove<RoomsModelType>(
      { _id },
      { returnDocument: "after" }
    );
    if (!room) {
      return { code: 500, message: `No room was deleted` };
    }
    await Messages.deleteOne({ roomId: room._id });
    await Members.deleteOne({ roomId: room._id });

    await publish(room);
    return room;
  }

  @Subscription({
    topics: "OnNewRoom",
  })
  roomSent(@Root() props: HydratedDocument<RoomType>): RoomType {
    return props;
  }

  @Subscription({
    topics: "OnDeleteRoom",
  })
  roomDeleted(@Root() props: HydratedDocument<RoomType>): RoomType {
    return props;
  }
}
