import { HydratedDocument } from "mongoose";
import { last } from "ramda";
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
import { FriendsType, FriendType } from "../entities/friends";

import { UserType } from "../entities/user";
import { Friends } from "../models/friends";

type idType = UserType["_id"];
type friendIdType = FriendType["_userId"];
type friendApprovalType = keyof Omit<FriendsType, "_userId" | "_id">;
type FriendsSubscriptionType = [FriendsType, FriendsType];

@Resolver()
export class FriendResolver {
  @Query(() => FriendsType)
  async getFriendsNode(
    @Arg("_userId") _userId: idType
  ): Promise<FriendsType | Error> {
    const node = await Friends.findOne<FriendsType>({
      _userId,
    });

    if (!node) {
      return { code: 500, message: `No friends node could be found` };
    }

    return node;
  }
  @Query(() => [FriendType])
  async getFriends(
    @Arg("_userId") _userId: idType,
    @Arg("type", { nullable: true }) type: friendApprovalType = "accepted"
  ): Promise<FriendType[] | Error> {
    const { [type]: friends } =
      (await Friends.findOne<FriendsType>({
        _userId,
      })) || {};

    if (friends === undefined) {
      return { code: 500, message: `No ${type} friends could be found` };
    }

    return friends;
  }

  @Mutation(() => FriendType)
  async sendFriendRequest(
    @PubSub("OnNewFriendRequest")
    publish: Publisher<FriendsSubscriptionType>,
    @Arg("_userId") _userId: idType,
    @Arg("_friendId") _friendId: friendIdType,
    @Arg("userSubType", { nullable: true })
    userSubType: friendApprovalType = "pending",
    @Arg("friendSubType", { nullable: true })
    friendSubType: friendApprovalType = "requests"
  ): Promise<FriendsType | Error> {
    const friendRequest = await Friends.findOneAndUpdate<FriendsType>(
      { _userId: _friendId },
      {
        $push: {
          [friendSubType]: {
            _userId,
          },
        },
      },
      { returnDocument: "after" }
    );

    if (!friendRequest) {
      return {
        code: 500,
        message: `Could not send friend ${friendSubType}`,
      };
    }

    const lastRequestsAdded = last(friendRequest[friendSubType]);
    if (lastRequestsAdded === undefined) {
      return {
        code: 500,
        message: `Could not send friend ${friendSubType}`,
      };
    }

    const userRequest = await Friends.findOneAndUpdate<FriendsType>(
      { _userId },
      {
        $push: {
          [userSubType]: {
            _userId: _friendId,
          },
        },
      },
      { returnDocument: "after" }
    );

    if (!userRequest) {
      return {
        code: 500,
        message: `Could not send user ${userSubType}`,
      };
    }

    const lastPendingAdded = last(userRequest[userSubType]);
    if (lastPendingAdded === undefined) {
      return {
        code: 500,
        message: `Could'nt get the last send friend request`,
      };
    }

    await publish([friendRequest, userRequest]);

    return userRequest;
  }

  @Mutation(() => FriendType)
  async updateFriendRequest(
    @PubSub("OnNewFriendRequest")
    publish: Publisher<FriendsSubscriptionType>,
    @Arg("_userId") _userId: idType,
    @Arg("_friendId") _friendId: friendIdType,
    @Arg("userSubTypeFrom", { nullable: true })
    userSubTypeFrom: friendApprovalType = "requests",
    @Arg("friendSubTypeFrom", { nullable: true })
    friendSubTypeFrom: friendApprovalType = "pending",
    @Arg("userSubTypeTo", { nullable: true })
    userSubTypeTo: friendApprovalType = "accepted",
    @Arg("friendSubTypeTo", { nullable: true })
    friendSubTypeTo: friendApprovalType = "accepted"
  ): Promise<FriendsType | Error> {
    console.log("userSubTypeTo", userSubTypeTo);
    console.log("friendSubTypeTo", friendSubTypeTo);

    const friendRequest = await Friends.findOneAndUpdate<FriendsType>(
      { _userId: _friendId },
      {
        $pull: { [friendSubTypeFrom]: { _userId } },
        $push: { [friendSubTypeTo]: { _userId } },
      },
      { returnDocument: "after" }
    );

    if (!friendRequest) {
      return {
        code: 500,
        message: `Could not send friend request`,
      };
    }

    const lastRequestsAdded = last(friendRequest[friendSubTypeTo]);
    if (lastRequestsAdded === undefined) {
      return {
        code: 500,
        message: `Could'nt get the last send friend request`,
      };
    }

    const userRequest = await Friends.findOneAndUpdate<FriendsType>(
      { _userId },
      {
        $pull: { [userSubTypeFrom]: { _userId: _friendId } },
        $push: { [userSubTypeTo]: { _userId: _friendId } },
      },
      { returnDocument: "after" }
    );

    if (!userRequest) {
      return {
        code: 500,
        message: `Could not send user pending`,
      };
    }

    const lastPendingAdded = last(userRequest[userSubTypeTo]);
    if (lastPendingAdded === undefined) {
      return {
        code: 500,
        message: `Could'nt get the last send friend request`,
      };
    }

    await publish([friendRequest, userRequest]);

    return userRequest;
  }

  @Subscription(() => [FriendsType, FriendsType], {
    topics: "OnNewFriendRequest",
  })
  friendRequestSent(
    @Root() props: HydratedDocument<FriendsSubscriptionType>
  ): FriendsSubscriptionType {
    console.log("on updated request: ", props);

    return props;
  }

  // @Subscription(() => FriendSubType, {
  //   topics: "OnNewFriendStatus",
  // })
  // friendStatusAdded(
  //   @Root() props: HydratedDocument<FriendRequestType>
  // ): FriendRequestType {
  //   console.log("on updated status: ", props);

  //   return props;
  // }
}
