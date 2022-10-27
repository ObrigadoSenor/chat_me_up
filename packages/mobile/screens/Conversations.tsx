import { useConversations } from '@chat_me_up/shared/hooks/useConversations';
import { useMemo } from 'react';
import styled from 'styled-components/native';
import { fakeUserId } from '../App';
import Item from '../components/conversation/item/item';
import { RootTabScreenProps } from '../types';

const Container = styled.ScrollView`
  padding: 20px;
`;

export default function Conversations({ navigation }: RootTabScreenProps<'Conversations'>) {
  const { conversations, loading, error } = useConversations({ _userId: fakeUserId });
  const renderConversations = useMemo(
    () => conversations.map((props) => <Item key={props._id} {...props} />),
    [conversations],
  );
  return <Container>{renderConversations}</Container>;
}
