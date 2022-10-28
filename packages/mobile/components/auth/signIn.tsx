/* eslint-disable no-undef */
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import styled from 'styled-components/native';
import { Box } from '../atoms/box';
import { Button } from '../atoms/button';
import { Input } from '../atoms/input';
import { setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { RootTabScreenProps } from '../../types';
import { useAppDispatch } from '../../store/store';
import { setUser } from '../../store/slices/auth';

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      name
      email
      token
    }
  }
`;

const Inp = styled(Input)`
  margin-bottom: 20px;
`;

interface NewUserProps {
  email?: string;
  password?: string;
}

export const SignIn = ({ navigation }: RootTabScreenProps<'Auth'>) => {
  const disaptch = useAppDispatch();

  const [username, setUsername] = useState<NewUserProps>({});

  const [loginUser] = useMutation(LOGIN_USER);

  const handleSignIn = async () => {
    await loginUser({ variables: { ...username } })
      .then(({ data }) => {
        if (data?.loginUser) {
          setItemAsync('userToken', data.loginUser.token);
          console.log('data.loginUser', data.loginUser);

          setItemAsync('user', JSON.stringify(data.loginUser));

          disaptch(setUser({ ...data?.loginUser }));
        }
      })
      .catch((err) => {
        console.log('err', err);
        deleteItemAsync('userToken');
      });
  };

  return (
    <Box text={{ children: 'Sign in' }}>
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
    </Box>
  );
};
