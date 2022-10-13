import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { MessageType, RoomType } from '../../__generated_types__/types';

const GET_MESSAGES = gql`
  query getMessages($_id: String!) {
    getMessages(_id: $_id) {
      _id
      roomId
      messages {
        _id
        name
        message
      }
    }
  }
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription OnNewMessage {
    messageSent {
      _id
      name
      message
    }
  }
`;

interface MessagesProps extends Pick<RoomType, '_id'> {}

export const Messages = ({ _id }: MessagesProps) => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES, { variables: { _id } });

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
  }, [_id]);

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  const { messages = [] } = data?.getMessages || {};
  return (
    <div>
      {messages.map(({ _id, name, message }: MessageType) => (
        <div key={_id}>
          <p>
            {name}: {message}
          </p>
        </div>
      ))}
    </div>
  );
};
