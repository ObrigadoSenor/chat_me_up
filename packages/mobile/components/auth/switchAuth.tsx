import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Text } from '../atoms/text';

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Btn = styled.View`
  margin-left: 5px;
`;

interface SwitchAuthProps {
  variant: 'signin' | 'signup';
}

type VariantsType = {
  [key in SwitchAuthProps['variant']]: {
    text: string;
    btn: string;
    title: string;
  };
};

const variants: VariantsType = {
  signin: {
    text: 'Already a member?',
    btn: 'Sign in now',
    title: 'Sign in',
  },
  signup: {
    text: 'Not a member?',
    btn: 'Sign up now',
    title: 'Sign up',
  },
};

export const SwitchAuth = ({ variant }: SwitchAuthProps) => {
  const navigation = useNavigation();
  const { text, btn, title } = variants[variant] || {};
  return (
    <Container>
      <Text>{text}</Text>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Modal', { variant, title })}>
        <Btn>
          <Text>{btn}</Text>
        </Btn>
      </TouchableWithoutFeedback>
    </Container>
  );
};
