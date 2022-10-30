import { gql } from '@apollo/client';

/* QUERIES */
export const GET_CONVERSATIONS = gql`
  query getConversations($_userId: String!) {
    getConversations(_userId: $_userId) {
      _id
      name
      _membersId
      _messagesId
      _adminsIds {
        _adminId
      }
    }
  }
`;

/* MUTATIONS */
export const UPDATE_NAME_OF_CONVERSATION = gql`
  mutation updateNameOfConversation($_conversationId: String!, $name: String!) {
    updateNameOfConversation(_conversationId: $_conversationId, name: $name) {
      _id
      name
      _membersId
      _messagesId
      _adminsIds {
        _adminId
      }
    }
  }
`;
export const ADD_CONVERSATION = gql`
  mutation addConversation($membersIds: [String!]!, $_userId: String!) {
    addConversation(membersIds: $membersIds, _userId: $_userId) {
      _id
      name
      _membersId
      _messagesId
    }
  }
`;

export const DELETE_CONVERSATION = gql`
  mutation deleteConversation($_conversationId: String!) {
    deleteConversation(_conversationId: $_conversationId) {
      _id
      name
    }
  }
`;

/* SUBSCRIPTIONS */
export const MESSAGES_SUBSCRIPTION = gql`
  subscription OnNewMessage {
    messageSent {
      _id
      _conversationId
      messages {
        _id
        _userId
        message
        createdAt
      }
    }
  }
`;

export const CONVERSATIONS_ADD_SUBSCRIPTION = gql`
  subscription OnNewConversation {
    conversationAdded {
      data {
        _id
        name
        _membersId
        _messagesId
        _adminsIds {
          _adminId
        }
      }
      membersIds
    }
  }
`;

export const CONVERSATIONS_DELETE_SUBSCRIPTION = gql`
  subscription OnDeleteConversation {
    conversationDeleted {
      data {
        _id
        name
        _membersId
        _messagesId
        _adminsIds {
          _adminId
        }
      }
      membersIds
    }
  }
`;

export const CONVERSATIONS_NAME_CHANGE_SUBSCRIPTION = gql`
  subscription OnNameChangeConversation {
    conversationNameChange {
      _id
      name
    }
  }
`;
