/* eslint-disable no-undef */
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { setUser } from '../../store/slices/auth';
import { useAppDispatch } from '../../store/store';

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

interface NewUserProps {
  email?: string;
  password?: string;
}

export const Login = () => {
  const disaptch = useAppDispatch();

  const [username, setUsername] = useState<NewUserProps>({});

  const [loginUser] = useMutation(LOGIN_USER);

  const handleSend = async () => {
    await loginUser({ variables: { ...username } })
      .then(({ data }) => {
        if (data?.loginUser) {
          disaptch(setUser({ ...data.loginUser }));
          localStorage.setItem('token', JSON.stringify(data.loginUser.token));
        }
      })
      .catch((err) => console.log('err', err));
  };

  return (
    <div>
      <input
        type="text"
        defaultValue={username.email}
        placeholder="email"
        onBlur={({ target }) => setUsername((prev) => ({ ...prev, email: target.value }))}
      ></input>
      <input
        type="password"
        defaultValue={username.password}
        placeholder="password"
        onBlur={({ target }) => setUsername((prev) => ({ ...prev, password: target.value }))}
      ></input>

      <button onClick={() => handleSend()}>Login</button>
    </div>
  );
};
