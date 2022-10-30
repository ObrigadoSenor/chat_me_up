import { gql } from '@apollo/client';

/* QUERIES */

/* MUTATIONS */
export const ADD_MEMBER = gql`
  mutation addMember($_conversationId: String!, $_userId: String!) {
    addMember(_conversationId: $_conversationId, _userId: $_userId) {
      _id
      _userId
    }
  }
`;

export const UPDATE_FRIEND_REQUEST = gql`
  mutation updateFriendRequest(
    $_friendId: String!
    $_userId: String!
    $userSubTypeFrom: String
    $friendSubTypeFrom: String
    $userSubTypeTo: String
    $friendSubTypeTo: String
  ) {
    updateFriendRequest(
      _friendId: $_friendId
      _userId: $_userId
      userSubTypeFrom: $userSubTypeFrom
      friendSubTypeFrom: $friendSubTypeFrom
      userSubTypeTo: $userSubTypeTo
      friendSubTypeTo: $friendSubTypeTo
    ) {
      _id
      _userId
    }
  }
`;

export const REMOVE_MEMBER = gql`
  mutation removeMember($_conversationId: String!, $_userId: String!) {
    removeMember(_conversationId: $_conversationId, _userId: $_userId) {
      _conversationId
      _userId
    }
  }
`;

/* SUBSCRIPTIONS */

export const MEMBER_ADD_SUBSCRIPTION = gql`
  subscription OnNewMember {
    memberAdded {
      _id
      _userId
    }
  }
`;

export const MEMBER_REMOVE_SUBSCRIPTION = gql`
  subscription OnRemoveMember {
    memberRemoved {
      _userId
      _conversationId
    }
  }
`;

export const MEMBERS_QUERIES = [
  ADD_MEMBER,
  UPDATE_FRIEND_REQUEST,
  REMOVE_MEMBER,
  MEMBER_ADD_SUBSCRIPTION,
  MEMBER_REMOVE_SUBSCRIPTION,
];
