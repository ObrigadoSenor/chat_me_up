import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useAppSelector } from '../../store/store';

const SEND_MESSAGE = gql`
  mutation sendMessage($_userId: String!, $message: String!, $_conversationId: String!) {
    sendMessage(_userId: $_userId, message: $message, _conversationId: $_conversationId) {
      _id
      _userId
      message
    }
  }
`;

export const SendMessage = () => {
  const { enteredConversationId: _conversationId } = useAppSelector(({ conversation }) => conversation);
  const { details } = useAppSelector(({ auth }) => auth);

  const [message, setMessage] = useState<string>('');
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSend = () => {
    sendMessage({ variables: { _userId: details?._id, message, _conversationId } })
      .then(() => {
        setMessage('');
      })
      .catch((err) => console.log('err', err));
  };

  return (
    <div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}></input>
      <button onClick={handleSend}>Create message</button>
    </div>
  );
};
