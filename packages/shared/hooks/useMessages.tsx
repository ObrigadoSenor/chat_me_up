import { gql, useQuery, useSubscription } from '@apollo/client';
import { reverse } from 'ramda';
import { useMemo } from 'react';
import { MessagesType, Query, Subscription } from '../generated/serverTypes';
import { MESSAGES_SUBSCRIPTION } from '../queries/conversationQueries';

const GET_MESSAGES = gql`
  query getMessages($_messagesId: String!) {
    getMessages(_messagesId: $_messagesId) {
      _id
      _conversationId
      messages {
        _id
        _userId
        createdAt
        updatedAt
        message
      }
    }
  }
`;

export const useMessages = (_messagesId: MessagesType['_id']) => {
  const { loading, error, data } = useQuery<{ getMessages: Query['getMessages'] }>(GET_MESSAGES, {
    variables: { _messagesId },
  });
  const messages = useMemo(() => data?.getMessages, [data]);

  const { data: subData } = useSubscription<{ messageSent: Subscription['messageSent'] }>(MESSAGES_SUBSCRIPTION);
  const { messageSent } = subData || {};

  const allMessages = useMemo(
    () =>
      messageSent === undefined || messageSent._id !== _messagesId ? messages?.messages || [] : messageSent.messages,
    [messageSent, messages],
  );

  return { messages: reverse(allMessages), loading, error };
};
