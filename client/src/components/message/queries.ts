import { gql } from '@apollo/client';

/* QUERIES */

/* MUTATIONS */
export const SEND_MESSAGE = gql`
  mutation sendMessage($_userId: String!, $message: String!, $_conversationId: String!) {
    sendMessage(_userId: $_userId, message: $message, _conversationId: $_conversationId) {
      _id
      _userId
      message
    }
  }
`;

/* SUBSCRIPTIONS */
