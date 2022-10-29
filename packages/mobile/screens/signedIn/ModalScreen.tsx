/* eslint-disable no-undef */
/* eslint-disable indent */
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { Layout } from '../../components/atoms/layout';
import { SignIn } from '../../components/auth/signIn';
import { SignUp } from '../../components/auth/signUp';
import { Settings } from '../../components/conversation/item/settings';

import { RootStackScreenProps } from '../../types';

export default function ModalScreen({ route, navigation }: RootStackScreenProps<'Modal'>) {
  const { params } = route || {};

  let component = null;
  switch (params?.variant) {
    case 'conversation':
      component = <Settings {...params} />;
      break;
    case 'signin':
      component = <SignIn />;
      break;
    case 'signup':
      component = <SignUp />;
      break;
    default:
      break;
  }

  return (
    <Layout bgVariant="modal">
      {component ? component : <></>}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Layout>
  );
}
