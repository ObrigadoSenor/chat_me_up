/* eslint-disable quotes */
import { HydratedDocument } from 'mongoose';
import { Arg, Mutation, Publisher, PubSub, Query, Resolver, Root, Subscription } from 'type-graphql';
import { loginUser } from '../axios/loginUser';
import { signUpUser } from '../axios/signUpUser';
import { validToken } from '../axios/validToken';

import { Error } from '../entities/error';

import { UserAddType, UserBasicType, UserType, ValidTokenType } from '../entities/user';
import { Friends } from '../models/friends';
import { User, UserBasicModelType, UserModelType } from '../models/user';

type idType = UserType['_id'];
type nameType = UserAddType['name'];
type emailType = UserAddType['email'];
type passwordType = UserAddType['password'];
type tokenType = UserType['token'];

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
  async getUser(@Arg('_id') _id: idType): Promise<UserModelType | Error> {
    const user = await User.findOne<UserModelType>({ _id });
    if (!user) {
      return { code: 500, message: `No user with id ${_id}` };
    }
    return user;
  }

  @Query(() => ValidTokenType)
  async validToken(@Arg('token') token: tokenType): Promise<ValidTokenType | Error> {
    const { expired } = await validToken({ token });

    return { expired };
  }

  @Query(() => UserType)
  async getUserByToken(@Arg('token') token: tokenType): Promise<UserModelType | Error> {
    const user = await User.findOne<UserModelType>({ token });
    if (!user) {
      return { code: 500, message: `No user with token ${token}` };
    }
    return user;
  }

  @Mutation(() => UserType)
  async addUser(
    @PubSub('OnNewUser') publish: Publisher<UserBasicModelType>,
    @Arg('name') name: nameType,
    @Arg('email') email: emailType,
    @Arg('password') password: passwordType,
    @Arg('confirmPassword') confirmPassword: passwordType,
  ): Promise<UserBasicModelType | Error> {
    const user = await signUpUser({ name, email, password, confirmPassword });

    if (!user) {
      return { code: 500, message: `Could'nt add user` };
    }

    const { _id: _friendsId } = await new Friends({
      _userId: user._id,
      pending: [],
      requests: [],
      accepted: [],
    }).save();

    const updateduser = (await User.findOneAndUpdate(
      { _id: user?._id },
      {
        $set: {
          conversations: [],
          friends: {
            _userId: _friendsId,
          },
        },
      },
      { returnDocument: 'after' },
    )) as UserBasicModelType;

    await publish(updateduser);
    return updateduser;
  }

  @Mutation(() => UserType)
  async loginUser(
    @Arg('email') email: emailType,
    @Arg('password') password: passwordType,
  ): Promise<UserBasicModelType | Error> {
    console.log('logging in');

    const user = await loginUser({ email, password });

    if (!user) {
      return { code: 500, message: `Could'nt add user` };
    }

    return user;
  }

  @Mutation(() => UserType)
  async deleteUser(
    @PubSub('OnDeleteUser') publish: Publisher<UserModelType>,
    @Arg('_id') _id: idType,
  ): Promise<UserModelType | Error> {
    const user = await User.findOneAndRemove<UserModelType>({ _id }, { returnDocument: 'after' });
    if (!user) {
      return { code: 500, message: `No user was deleted` };
    }

    await publish(user);
    return user;
  }

  @Subscription({
    topics: 'OnNewUser',
  })
  userAdded(@Root() props: HydratedDocument<UserBasicType>): UserBasicType {
    console.log('user sub: ', props);

    return props;
  }

  @Subscription({
    topics: 'OnDeleteUser',
  })
  userDeleted(@Root() props: HydratedDocument<UserType>): UserType {
    return props;
  }
}
