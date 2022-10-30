import { useMutation } from '@apollo/client';
import { ADD_USER } from '@chat_me_up/shared/queries/authQueries';
import { useState } from 'react';
import { Button } from '../atoms/button';
import { Container, Inp, InputContainer, SwitchAuthContainer } from './authStyle';
import { SwitchAuth } from './switchAuth';

interface NewUserProps {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const SignUp = () => {
  const [username, setUsername] = useState<NewUserProps>({});

  const [addUser] = useMutation(ADD_USER);
  // const [deleteUser] = useMutation(DELETE_USER);

  const handleSend = async () => {
    await addUser({ variables: { ...username } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  // const handleDelete = async (_id: UserType['_id']) => {
  //   await deleteUser({ variables: { _id } })
  //     .then(() => {})
  //     .catch((err) => console.log('err', err));
  // };

  return (
    <Container>
      <InputContainer>
        <Inp
          defaultValue={username.name}
          placeholder="Name"
          autoComplete="name"
          onEndEditing={({ nativeEvent }) => setUsername((prev) => ({ ...prev, name: nativeEvent.text }))}
        />
        <Inp
          defaultValue={username.email}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          onEndEditing={({ nativeEvent }) => setUsername((prev) => ({ ...prev, email: nativeEvent.text }))}
        />
        <Inp
          secureTextEntry={true}
          defaultValue={username.password}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="password"
          onEndEditing={({ nativeEvent }) => setUsername((prev) => ({ ...prev, password: nativeEvent.text }))}
        />
        <Inp
          secureTextEntry={true}
          defaultValue={username.confirmPassword}
          placeholder="Confirm password"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="password-new"
          onEndEditing={({ nativeEvent }) => setUsername((prev) => ({ ...prev, confirmPassword: nativeEvent.text }))}
        />

        <Button title="Sign up" onPress={() => handleSend()} />
      </InputContainer>
      <SwitchAuthContainer>
        <SwitchAuth variant="signin" />
      </SwitchAuthContainer>
    </Container>
  );
};
