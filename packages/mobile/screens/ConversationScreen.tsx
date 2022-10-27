import { useMessages } from '@chat_me_up/shared/hooks/useMessages';
import styled from 'styled-components/native';
import { Messages } from '../components/conversation/messages/messages';
import SendMessage from '../components/conversation/messages/sendMessage';

import { RootStackScreenProps } from '../types';

export const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 40px;
`;

export default function ConversationScreen({ navigation, route }: RootStackScreenProps<'Conversation'>) {
  const { params } = route || {};
  const { _messagesId, _conversationId } = params;

  return (
    <Container>
      <Messages _id={_messagesId} />
      <SendMessage _conversationId={_conversationId} />
    </Container>
  );
}
