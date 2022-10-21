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

export type ConversationBasicType = {
  _conversationId: Scalars['String'];
  _id: Scalars['String'];
};

export type ConversationType = {
  _id: Scalars['String'];
  _membersId: Scalars['String'];
  _messagesId: Scalars['String'];
  name: Scalars['String'];
};

export type FriendType = {
  _id: Scalars['String'];
  _userId: Scalars['String'];
};

export type FriendsBasicType = {
  _id: Scalars['String'];
  _userId: Scalars['String'];
};

export type FriendsType = {
  _id: Scalars['String'];
  _userId: Scalars['String'];
  accepted: Array<FriendType>;
  pending: Array<FriendType>;
  requests: Array<FriendType>;
};

export type MemberType = {
  _id: Scalars['String'];
  _userId: Scalars['String'];
};

export type MessageType = {
  _id: Scalars['String'];
  _userId: Scalars['String'];
  message: Scalars['String'];
};

export type MessagesType = {
  _conversationId: Scalars['String'];
  _id: Scalars['String'];
  messages: Array<MessageType>;
};

export type Mutation = {
  addConversation: ConversationType;
  addMember: MemberType;
  addUser: UserType;
  deleteConversation: ConversationType;
  deleteUser: UserType;
  loginUser: UserType;
  removeMember: MemberType;
  sendFriendRequest: FriendType;
  sendMessage: MessageType;
  updateFriendRequest: FriendType;
};


export type MutationAddConversationArgs = {
  _userId: Scalars['String'];
  membersIds: Array<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationAddMemberArgs = {
  _conversationId: Scalars['String'];
  _userId: Scalars['String'];
};


export type MutationAddUserArgs = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationDeleteConversationArgs = {
  _conversationId: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  _id: Scalars['String'];
};


export type MutationLoginUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveMemberArgs = {
  _conversationId: Scalars['String'];
  _userId: Scalars['String'];
};


export type MutationSendFriendRequestArgs = {
  _friendId: Scalars['String'];
  _userId: Scalars['String'];
  friendSubType?: InputMaybe<Scalars['String']>;
  userSubType?: InputMaybe<Scalars['String']>;
};


export type MutationSendMessageArgs = {
  _conversationId: Scalars['String'];
  _userId: Scalars['String'];
  message: Scalars['String'];
};


export type MutationUpdateFriendRequestArgs = {
  _friendId: Scalars['String'];
  _userId: Scalars['String'];
  friendSubTypeFrom?: InputMaybe<Scalars['String']>;
  friendSubTypeTo?: InputMaybe<Scalars['String']>;
  userSubTypeFrom?: InputMaybe<Scalars['String']>;
  userSubTypeTo?: InputMaybe<Scalars['String']>;
};

export type Query = {
  getConversations: Array<ConversationType>;
  getFriends: Array<FriendType>;
  getFriendsNode: FriendsType;
  getMembers: Array<MemberType>;
  getMessages: MessagesType;
  getUser: UserType;
  getUserByToken: UserType;
  getUsers: Array<UserType>;
  joinConversation: ConversationType;
  validToken: ValidTokenType;
};


export type QueryGetConversationsArgs = {
  _userId: Scalars['String'];
};


export type QueryGetFriendsArgs = {
  _userId: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};


export type QueryGetFriendsNodeArgs = {
  _userId: Scalars['String'];
};


export type QueryGetMembersArgs = {
  _conversationId: Scalars['String'];
};


export type QueryGetMessagesArgs = {
  _conversationId: Scalars['String'];
};


export type QueryGetUserArgs = {
  _id: Scalars['String'];
};


export type QueryGetUserByTokenArgs = {
  token: Scalars['String'];
};


export type QueryJoinConversationArgs = {
  _conversationId: Scalars['String'];
};


export type QueryValidTokenArgs = {
  token: Scalars['String'];
};

export type Subscription = {
  conversationAdded: ConversationType;
  conversationDeleted: ConversationType;
  friendRequestSent: Array<FriendsType>;
  memberAdded: MemberType;
  memberRemoved: MemberType;
  messageSent: MessageType;
  userAdded: UserBasicType;
  userDeleted: UserType;
};

export type UserBasicType = {
  _id: Scalars['String'];
  conversations: Array<ConversationBasicType>;
  email: Scalars['String'];
  friends: FriendsBasicType;
  name: Scalars['String'];
};

export type UserType = {
  _id: Scalars['String'];
  conversations: Array<ConversationBasicType>;
  date: Scalars['String'];
  email: Scalars['String'];
  friends: FriendsBasicType;
  hash: Scalars['String'];
  name: Scalars['String'];
  salt: Scalars['String'];
  token: Scalars['String'];
};

export type ValidTokenType = {
  expired: Scalars['Boolean'];
};
