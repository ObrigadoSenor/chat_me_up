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

import { UserType } from "../entities/user";
import { User, UserModelType } from "../models/user";

type idType = UserType["_id"];
type usernameType = UserType["username"];

@Resolver()
export class UserResolver {
  @Query(() => [UserType])
  async getUsers(): Promise<UserModelType[] | Error> {
    const users = await User.find<UserModelType>();

    if (!users) {
      return { code: 500, message: `No users` };
    }
    return users;
  }
  @Query(() => UserType)
  async getUser(@Arg("_id") _id: idType): Promise<UserModelType | Error> {
    const user = await User.findOne<UserModelType>({ _id });
    if (!user) {
      return { code: 500, message: `No user with id ${_id}` };
    }
    return user;
  }

  @Mutation(() => UserType)
  async addUser(
    @PubSub("OnNewUser") publish: Publisher<UserModelType>,
    @Arg("username") username: usernameType
  ): Promise<UserModelType | Error> {
    const user = (await new User({
      username,
    }).save()) as UserModelType;

    if (!user) {
      return { code: 500, message: `Could'nt add user` };
    }

    await publish(user);
    return user;
  }

  @Mutation(() => UserType)
  async deleteUser(
    @PubSub("OnDeleteUser") publish: Publisher<UserModelType>,
    @Arg("_id") _id: idType
  ): Promise<UserModelType | Error> {
    const user = await User.findOneAndRemove<UserModelType>(
      { _id },
      { returnDocument: "after" }
    );
    if (!user) {
      return { code: 500, message: `No user was deleted` };
    }

    await publish(user);
    return user;
  }

  @Subscription({
    topics: "OnNewUser",
  })
  userAdded(@Root() props: HydratedDocument<UserType>): UserType {
    return props;
  }

  @Subscription({
    topics: "OnDeleteUser",
  })
  userDeleted(@Root() props: HydratedDocument<UserType>): UserType {
    return props;
  }
}
