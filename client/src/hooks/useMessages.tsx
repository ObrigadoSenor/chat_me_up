import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { MessagesType, Query } from '../../__generated_types__/types';

const GET_MESSAGES = gql`
  query getMessages($_messagesId: String!) {
    getMessages(_messagesId: $_messagesId) {
      _id
      _conversationId
      messages {
        message
      }
    }
  }
`;

export const useMessages = (_messagesId: MessagesType['_id']) => {
  const { loading, error, data } = useQuery<{ getMessages: Query['getMessages'] }>(GET_MESSAGES, {
    variables: { _messagesId },
  });

  const getMessages = useMemo(() => data?.getMessages, [data]);

  return getMessages;
};
