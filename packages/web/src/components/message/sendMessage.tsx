import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';
import { MessagesType } from '../../../__generated_types__/types';
import { useAppSelector } from '../../store/store';
import { Input } from '../atoms/input1';
import { SEND_MESSAGE } from './queries';

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
`;

const SendMessage = ({ _conversationId }: Pick<MessagesType, '_conversationId'>) => {
  const { details } = useAppSelector(({ auth }) => auth);

  const [message, setMessage] = useState<string>('');
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSend = (message?: string) => {
    if (!message) return null;
    sendMessage({ variables: { _userId: details?._id, message, _conversationId } })
      .then(() => {
        setMessage('');
      })
      .catch((err) => console.log('err', err));
  };

  return (
    <SendMessagesContainer>
      <Input
        placeholder="New message"
        icons={{ end: { icon: 'paper-plane', onClick: (value) => handleSend(value) } }}
      />
    </SendMessagesContainer>
  );
};

export default SendMessage;
