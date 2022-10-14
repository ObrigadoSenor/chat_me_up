export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type MemberType = {
  _id: Scalars['String'];
  _userId: Scalars['String'];
};

export type MessageType = {
  _id: Scalars['String'];
  message: Scalars['String'];
  name: Scalars['String'];
};

export type MessagesType = {
  _id: Scalars['String'];
  messages: Array<MessageType>;
  roomId: Scalars['String'];
};

export type Mutation = {
  addMember: MemberType;
  addUser: UserType;
  deleteRoom: RoomType;
  deleteUser: UserType;
  removeMember: MemberType;
  sendMessage: MessageType;
  sendRoom: RoomType;
};

export type MutationAddMemberArgs = {
  _id: Scalars['String'];
  _userId: Scalars['String'];
};

export type MutationAddUserArgs = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type MutationDeleteRoomArgs = {
  _id: Scalars['String'];
};

export type MutationDeleteUserArgs = {
  _id: Scalars['String'];
};

export type MutationRemoveMemberArgs = {
  _id: Scalars['String'];
  _userId: Scalars['String'];
};

export type MutationSendMessageArgs = {
  _id: Scalars['String'];
  message: Scalars['String'];
  name: Scalars['String'];
};

export type MutationSendRoomArgs = {
  name: Scalars['String'];
};

export type Query = {
  getMembers: Array<MemberType>;
  getMessages: MessagesType;
  getRooms: Array<RoomType>;
  getUser: UserType;
  getUsers: Array<UserType>;
  joinRoom: RoomType;
};

export type QueryGetMembersArgs = {
  _id: Scalars['String'];
};

export type QueryGetMessagesArgs = {
  _id: Scalars['String'];
};

export type QueryGetUserArgs = {
  _id: Scalars['String'];
};

export type QueryJoinRoomArgs = {
  _id: Scalars['String'];
};

export type RoomType = {
  _id: Scalars['String'];
  membersId: Scalars['String'];
  messagesId: Scalars['String'];
  name: Scalars['String'];
};

export type Subscription = {
  memberAdded: MemberType;
  memberRemoved: MemberType;
  messageSent: MessageType;
  roomDeleted: RoomType;
  roomSent: RoomType;
  userAdded: UserBasicType;
  userDeleted: UserType;
};

export type UserBasicType = {
  _id: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type UserType = {
  _id: Scalars['String'];
  date: Scalars['String'];
  email: Scalars['String'];
  hash: Scalars['String'];
  name: Scalars['String'];
  salt: Scalars['String'];
  token: Scalars['String'];
};
