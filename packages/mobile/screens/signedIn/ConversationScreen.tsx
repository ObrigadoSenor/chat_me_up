import styled from 'styled-components/native';
import { Layout } from '../../components/atoms/layout';
import { Messages } from '../../components/conversation/messages/messages';
import SendMessage from '../../components/conversation/messages/sendMessage';

import { RootStackScreenProps } from '../../types';

export const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 40px;
`;

export default function ConversationScreen({ route }: RootStackScreenProps<'Conversation'>) {
  const { params } = route || {};
  const { _messagesId, _id } = params || {};

  return (
    <Layout>
      {_messagesId ? <Messages _id={_messagesId} /> : null}
      {_id ? <SendMessage _id={_id} /> : null}
    </Layout>
  );
}
