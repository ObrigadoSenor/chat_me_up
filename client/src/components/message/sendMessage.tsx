import { gql, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';
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

const SendMessagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 1rem 2rem;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(30, 30, 30, 0.75);
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  color: white;
  & > input {
    width: 100%;
    margin-right: 2rem;
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
    <SendMessagesContainer>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}></input>
      <FontAwesomeIcon onClick={handleSend} icon="paper-plane" />
    </SendMessagesContainer>
  );
};
