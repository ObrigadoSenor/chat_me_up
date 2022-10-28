/* eslint-disable indent */
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { Settings } from '../../components/conversation/item/settings';

import { RootStackScreenProps } from '../../types';

const Container = styled.View`
  flex-direction: column;
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
`;

export default function ModalScreen({ route }: RootStackScreenProps<'Modal'>) {
  const { params } = route || {};
  let component = null;
  switch (params?.variant) {
    case 'conversation':
      component = <Settings {...params} />;
      break;
    default:
      break;
  }

  return (
    <Container>
      {component}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Container>
  );
}
