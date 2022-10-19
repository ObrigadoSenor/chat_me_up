import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    addUser(name: $name, email: $email, password: $password, confirmPassword: $confirmPassword) {
      _id
      name
      email
    }
  }
`;

// const DELETE_USER = gql`
//   mutation deleteUser($_id: String!) {
//     deleteUser(_id: $_id) {
//       _id
//       name
//       email
//     }
//   }
// `;

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
    <div>
      <input
        type="text"
        defaultValue={username.name}
        placeholder="name"
        onBlur={({ target }) => setUsername((prev) => ({ ...prev, name: target.value }))}
      ></input>
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
      <input
        type="password"
        defaultValue={username.confirmPassword}
        placeholder="confirmPassword"
        onBlur={({ target }) => setUsername((prev) => ({ ...prev, confirmPassword: target.value }))}
      ></input>

      <button onClick={() => handleSend()}>Sign up</button>
    </div>
  );
};
