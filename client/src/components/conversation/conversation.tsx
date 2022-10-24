import { gql, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { useAppSelector } from '../../store/store';
import { Messages } from '../message/messages';
import { SendMessage } from '../message/sendMessage';

const JOIN_CONVERSATION = gql`
  query joinConversation($_conversationId: String!) {
    joinConversation(_conversationId: $_conversationId) {
      _id
      name
    }
  }
`;

const ConversationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 30vw;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(30, 30, 30, 0.75);
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  color: white;
  & > svg {
    margin-right: 1rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  overflow: scroll;
  max-height: 40vh;
  width: 100%;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  background-color: rgba(230, 230, 230, 0.8);
`;

const Title = styled.h3`
  margin: 0;
  height: 100%;
`;

const Conversation = () => {
  const { enteredConversationId: _conversationId } = useAppSelector(({ conversation }) => conversation);

  const { loading, error, data } = useQuery(JOIN_CONVERSATION, { variables: { _conversationId } });

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <ConversationContainer>
      <TitleContainer>
        <FontAwesomeIcon icon="message" />
        <Title>{data?.joinConversation?.name}</Title>
        {/* <Members /> */}
      </TitleContainer>
      <ContentContainer>
        <Messages />
      </ContentContainer>
      <SendMessage />
    </ConversationContainer>
  );
};

export default Conversation;
