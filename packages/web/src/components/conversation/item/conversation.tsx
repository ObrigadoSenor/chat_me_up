import styled from 'styled-components';
import { ConversationType } from '../../../../__generated_types__/types';
import { useMessages } from '../../../hooks/useMessages';
import { Messages } from '../../message/messages';

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

const Conversation = ({ _messagesId }: ConversationType) => {
  const { messages = [], loading, error } = useMessages(_messagesId) || {};

  return (
    <ContentContainer>
      <Messages messages={messages} />
    </ContentContainer>
  );
};

export default Conversation;
