import { gql, useMutation, useQuery } from '@apollo/client';
import { compose, filter, not, propEq } from 'ramda';
import { useEffect, useState } from 'react';
import { UserType } from '../../__generated_types__/types';

const GET_USERS = gql`
  query getUsers {
    getUsers {
      _id
      name
      email
    }
  }
`;

export const GET_USER = gql`
  query getUser($_id: String!) {
    getUser(_id: $_id) {
      _id
      name
      email
    }
  }
`;

const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    addUser(name: $name, email: $email, password: $password, confirmPassword: $confirmPassword) {
      _id
      name
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($_id: String!) {
    deleteUser(_id: $_id) {
      _id
      name
      email
    }
  }
`;

const USER_ADD_SUBSCRIPTION = gql`
  subscription OnNewUser {
    userAdded {
      _id
      name
      email
    }
  }
`;

const USER_DELETE_SUBSCRIPTION = gql`
  subscription OnDeleteUser {
    userDeleted {
      _id
      name
      email
    }
  }
`;

interface UserProps {
  addUserToRoom: (_userId: UserType['_id']) => void;
  removeUserFromRoom: (_userId: UserType['_id']) => void;
}

interface NewUserProps {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const User = ({ addUserToRoom, removeUserFromRoom }: UserProps) => {
  const [username, setUsername] = useState<NewUserProps>({});

  const { loading, error, data, subscribeToMore } = useQuery(GET_USERS);

  const [addUser] = useMutation(ADD_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  useEffect(() => {
    const unsubFromAdd = subscribeToMore({
      document: USER_ADD_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData = {} }) => {
        const { data } = subscriptionData;
        if (!data) return prev;
        return {
          getUsers: [...prev.getUsers, data?.userAdded],
        };
      },
    });
    const unsubFromDelete = subscribeToMore({
      document: USER_DELETE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData = {} }) => {
        const { data } = subscriptionData;

        if (!data) return prev;

        const { userDeleted = {} } = data;
        const { getUsers = [] } = prev;

        const keppedUsers = filter(compose(not, propEq('_id', userDeleted?._id)), getUsers);
        const removed = keppedUsers.length !== getUsers.length;
        return {
          getUsers: removed ? keppedUsers : getUsers,
        };
      },
    });
    return () => {
      unsubFromAdd();
      unsubFromDelete();
    };
  }, []);

  const handleSend = async () => {
    await addUser({ variables: { ...username } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  const handleDelete = async (_id: UserType['_id']) => {
    await deleteUser({ variables: { _id } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  const { getUsers = [] } = data || {};
  return (
    <div>
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

        <button onClick={() => handleSend()}>Add user</button>
      </div>
      {getUsers.map(({ _id, name, email }: UserType) => (
        <div key={_id}>
          <p>{name}</p>
          <p>{email}</p>

          <button onClick={() => handleDelete(_id)}>Delete user</button>

          <button onClick={() => addUserToRoom(_id)}>Add user to room</button>
          <button onClick={() => removeUserFromRoom(_id)}>Remove user from room</button>
        </div>
      ))}
    </div>
  );
};
