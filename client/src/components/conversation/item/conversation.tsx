import { useSubscription } from '@apollo/client';
import { reverse } from 'ramda';
import { useMemo } from 'react';
import styled from 'styled-components';
import { ConversationType, Subscription } from '../../../../__generated_types__/types';
import { useMessages } from '../../../hooks/useMessages';
import { Messages } from '../../message/messages';
import { MESSAGES_SUBSCRIPTION } from '../queries';

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
  const { messages = [] } = useMessages(_messagesId) || {};
  const { data: subData } = useSubscription<{ messageSent: Subscription['messageSent'] }>(MESSAGES_SUBSCRIPTION);
  const { messageSent } = subData || {};

  const allMessages = useMemo(
    () => (messageSent === undefined || messageSent._id !== _messagesId ? messages : messageSent.messages),
    [messageSent, messages],
  );

  const revMessage = reverse(allMessages);

  return (
    <ContentContainer>
      <Messages messages={revMessage} />
    </ContentContainer>
  );
};

export default Conversation;
