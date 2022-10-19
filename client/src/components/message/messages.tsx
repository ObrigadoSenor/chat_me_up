import { gql, useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { MessageType } from '../../../__generated_types__/types';
import { useAppSelector } from '../../store/store';
import { Message } from './message';

const GET_MESSAGES = gql`
  query getMessages($_conversationId: String!) {
    getMessages(_conversationId: $_conversationId) {
      _id
      _conversationId
      messages {
        _id
        _userId
        message
      }
    }
  }
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription OnNewMessage {
    messageSent {
      _id
      _userId
      message
    }
  }
`;

export const Messages = () => {
  const { enteredConversationId: _conversationId } = useAppSelector(({ conversation }) => conversation);
  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES, { variables: { _conversationId } });

  useEffect(() => {
    const unsub = subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData = {} }) => {
        const { data } = subscriptionData;

        if (!data) return prev;
        const { messageSent } = data || {};
        const { messages = [] } = prev?.getMessages || {};
        return {
          getMessages: [...messages, messageSent],
        };
      },
    });
    return () => unsub();
  }, []);

  const { messages = [] } = data?.getMessages || {};
  const memoMessages = useMemo(
    () => messages.map((props: MessageType) => <Message key={props._id} {...props} />),
    [messages],
  );

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return memoMessages;
};
