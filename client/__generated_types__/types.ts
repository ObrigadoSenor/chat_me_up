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

export type ConversationBasicBasicType = {
  _conversationId: Scalars['String'];
  _id: Scalars['String'];
};

export type ConversationType = {
  _id: Scalars['String'];
  _membersId: Scalars['String'];
  _messagesId: Scalars['String'];
  name: Scalars['String'];
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
  sendMessage: MessageType;
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


export type MutationSendMessageArgs = {
  _conversationId: Scalars['String'];
  _userId: Scalars['String'];
  message: Scalars['String'];
};

export type Query = {
  getConversations: Array<ConversationType>;
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
  memberAdded: MemberType;
  memberRemoved: MemberType;
  messageSent: MessageType;
  userAdded: UserBasicType;
  userDeleted: UserType;
};

export type UserBasicType = {
  _id: Scalars['String'];
  conversations: Array<ConversationBasicBasicType>;
  email: Scalars['String'];
  name: Scalars['String'];
};

export type UserType = {
  _id: Scalars['String'];
  conversations: Array<ConversationBasicBasicType>;
  date: Scalars['String'];
  email: Scalars['String'];
  hash: Scalars['String'];
  name: Scalars['String'];
  salt: Scalars['String'];
  token: Scalars['String'];
};

export type ValidTokenType = {
  expired: Scalars['Boolean'];
};
