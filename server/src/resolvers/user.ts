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
import { signUpUser } from "../axios/user";

import { Error } from "../entities/error";

import { UserAddType, UserBasicType, UserType } from "../entities/user";
import { User, UserBasicModelType, UserModelType } from "../models/user";

type idType = UserType["_id"];
type nameType = UserAddType["name"];
type emailType = UserAddType["email"];
type passwordType = UserAddType["password"];

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
    @PubSub("OnNewUser") publish: Publisher<UserBasicModelType>,
    @Arg("name") name: nameType,
    @Arg("email") email: emailType,
    @Arg("password") password: passwordType,
    @Arg("confirmPassword") confirmPassword: passwordType
  ): Promise<UserBasicModelType | Error> {
    const user = await signUpUser({ name, email, password, confirmPassword });
    console.log("user", user);

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
  userAdded(@Root() props: HydratedDocument<UserBasicType>): UserBasicType {
    console.log("user sub: ", props);

    return props;
  }

  @Subscription({
    topics: "OnDeleteUser",
  })
  userDeleted(@Root() props: HydratedDocument<UserType>): UserType {
    return props;
  }
}
