/* eslint-disable no-undef */
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '@chat_me_up/shared/queries/authQueries';
import { deleteItemAsync } from 'expo-secure-store';
import { useState } from 'react';
import { setUser } from '../../store/slices/auth';
import { useAppDispatch } from '../../store/store';
import { Button } from '../atoms/button';
import { Container, Inp, InputContainer, SwitchAuthContainer } from './authStyle';
import { SwitchAuth } from './switchAuth';

interface NewUserProps {
  email?: string;
  password?: string;
}

export const SignIn = () => {
  const disaptch = useAppDispatch();

  const [username, setUsername] = useState<NewUserProps>({});

  const [loginUser] = useMutation(LOGIN_USER);

  const handleSignIn = async () => {
    await loginUser({ variables: { ...username } })
      .then(({ data }) => {
        if (data?.loginUser) {
          disaptch(setUser({ ...data?.loginUser }));
        }
      })
      .catch((err) => {
        deleteItemAsync('userToken');
      });
  };

  return (
    <Container>
      <InputContainer>
        <Inp
          defaultValue={username.email}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          placeholder="Email"
          onChangeText={(text) => setUsername((prev) => ({ ...prev, email: text }))}
        />
        <Inp
          secureTextEntry={true}
          defaultValue={username.password}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          placeholder="Password"
          onChangeText={(password) => setUsername((prev) => ({ ...prev, password }))}
        />
        <Button title="Sign in" onPress={() => handleSignIn()} />
      </InputContainer>
      <SwitchAuthContainer>
        <SwitchAuth variant="signup" />
      </SwitchAuthContainer>
    </Container>
  );
};
