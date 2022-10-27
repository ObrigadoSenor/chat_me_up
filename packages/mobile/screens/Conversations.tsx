import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useConversations } from '@chat_me_up/shared/hooks/useConversations';
import { useMemo } from 'react';
import Item from '../components/conversation/item/item';
import styled from 'styled-components/native';

const Container = styled.ScrollView`
  padding: 20px;
`;

export default function Conversations({ navigation }: RootTabScreenProps<'Conversations'>) {
  const { conversations, loading, error } = useConversations({ _userId: '6351ad14b665f50d8f39ecc8' });
  const renderConversations = useMemo(
    () => conversations.map((props) => <Item key={props._id} {...props} />),
    [conversations],
  );
  return <Container>{renderConversations}</Container>;
}
