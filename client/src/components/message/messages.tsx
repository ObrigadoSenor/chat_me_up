import { gql, useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { MessageType } from '../../../__generated_types__/types';
import { useAppSelector } from '../../store/store';
import { Message } from './message';

const GET_MESSAGES = gql`
  query getMessage($_conversationId: String!) {
    getMessage(_conversationId: $_conversationId) {
      _id
      _userId
      message
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
        const { getMessage = [] } = prev || {};
        return {
          getMessage: [...getMessage, messageSent],
        };
      },
    });
    return () => unsub();
  }, []);

  const { getMessage = [] } = data || {};
  const memoMessages = useMemo(
    () => getMessage.map((props: MessageType) => <Message key={props._id} {...props} />),
    [getMessage],
  );

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <>
      <h1>MESSAGES</h1>
      {memoMessages}
    </>
  );
};
