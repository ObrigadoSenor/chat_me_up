import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { RoomType } from '../../__generated_types__/types';

const SEND_MESSAGE = gql`
  mutation sendMessage($name: String!, $message: String!, $_id: String!) {
    sendMessage(name: $name, message: $message, _id: $_id) {
      _id
      name
      message
    }
  }
`;

interface SendMessageProps extends Pick<RoomType, '_id'> {}

export const SendMessage = ({ _id }: SendMessageProps) => {
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSend = () => {
    sendMessage({ variables: { name, message, _id } })
      .then(() => {
        setMessage('');
      })
      .catch((err) => console.log('err', err));
  };

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}></input>
      <button onClick={handleSend}>Create message</button>
    </div>
  );
};
