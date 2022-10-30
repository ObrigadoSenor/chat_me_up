import { useMemo } from 'react';
import styled from 'styled-components';
import { ConversationType } from '../../../__generated_types__/types';
import { useConversations } from '../../hooks/useConversations';
import ConversationsItem from './item/item';

const ConversationsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  width: 30%;
  padding: 0;
`;

const Conversations = () => {
  const { conversations, loading, error } = useConversations();
  const memoConversations = useMemo(
    () => conversations.map((props: ConversationType) => <ConversationsItem key={props._id} {...props} />),
    [conversations],
  );

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return <ConversationsContainer>{memoConversations}</ConversationsContainer>;
};

export default Conversations;
