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
  username: Scalars['String'];
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
  sendMessage: MessageType;
  sendRoom: RoomType;
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
  getMessages: Array<MessagesType>;
  getMessagess: Array<MemberType>;
  getRooms: Array<RoomType>;
  joinRoom: RoomType;
};


export type QueryGetMessagesArgs = {
  _id: Scalars['String'];
};


export type QueryGetMessagessArgs = {
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
  messageSent: MessageType;
  roomSent: RoomType;
};
