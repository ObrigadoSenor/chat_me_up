import { gql, useMutation, useSubscription } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo } from 'react';
import styled from 'styled-components';
import { ConversationType, Subscription } from '../../../__generated_types__/types';
import { useMessages } from '../../hooks/useMessages';
import { setConversationId } from '../../store/slices/conversation';
import { useAppDispatch } from '../../store/store';
import { MESSAGES_SUBSCRIPTION } from '../message/messages';
import { head, last } from 'ramda';

const DELETE_CONVERSATION = gql`
  mutation deleteConversation($_conversationId: String!) {
    deleteConversation(_conversationId: $_conversationId) {
      _id
      name
    }
  }
`;

const Container = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(100, 100, 100, 1);
  box-sizing: border-box;
  border-radius: 0.5rem;
  color: white;
  &:not(:first-of-type) {
    margin-top: 0.75rem;
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 1rem;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-left: 1rem;
`;

const Title = styled.span`
  font-size: 1rem;
`;

const LatestMessage = styled.span`
  font-size: 0.65rem;
`;

const Menu = styled.div`
  padding: 1rem;
`;

const Btn = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
`;

const ConversationsItem = ({ _id, name, _messagesId }: ConversationType) => {
  const disaptch = useAppDispatch();

  const { messages = [] } = useMessages(_messagesId) || {};

  const { data: subData } = useSubscription<{ messageSent: Subscription['messageSent'] }>(MESSAGES_SUBSCRIPTION);
  const { messageSent } = subData || {};

  const { message } =
    useMemo(() => {
      if (messageSent && messageSent._id === _messagesId) {
        return last(messageSent.messages);
      }

      return last(messages);
    }, [messages, messageSent]) || {};

  const [deleteConversation] = useMutation(DELETE_CONVERSATION);

  const handleDelete = async (_conversationId: ConversationType['_id']) => {
    await deleteConversation({ variables: { _conversationId } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  return (
    <Container>
      <Content>
        <FontAwesomeIcon icon="message" />
        <Text>
          <Title>{name}</Title>
          {message && <LatestMessage>{message}</LatestMessage>}
        </Text>
        <Btn onClick={() => disaptch(setConversationId(_id))} />
      </Content>

      <Menu>
        <FontAwesomeIcon onClick={() => handleDelete(_id)} icon="delete-left" />
      </Menu>
    </Container>
  );
};

export default ConversationsItem;
