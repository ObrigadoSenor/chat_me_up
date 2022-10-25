import { gql } from '@apollo/client';

/* QUERIES */

/* MUTATIONS */
export const SEND_FRIEND_REQUEST = gql`
  mutation sendFriendRequest($_friendId: String!, $_userId: String!, $userSubType: String, $friendSubType: String) {
    sendFriendRequest(
      _friendId: $_friendId
      _userId: $_userId
      userSubType: $userSubType
      friendSubType: $friendSubType
    ) {
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

/* SUBSCRIPTIONS */
