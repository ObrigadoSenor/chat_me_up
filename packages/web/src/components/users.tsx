import { gql, useQuery } from '@apollo/client';
import { compose, filter, not, propEq, reject } from 'ramda';
import { useEffect, useMemo } from 'react';
import { UserType } from '../../__generated_types__/types';
import { useAppSelector } from '../store/store';

const GET_USERS = gql`
  query getUsers {
    getUsers {
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
  onUserClick: (_userId: UserType['_id']) => void;
}

export const Users = ({ onUserClick }: UserProps) => {
  const { details } = useAppSelector(({ auth }) => auth);
  const { loading, error, data, subscribeToMore } = useQuery(GET_USERS);

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
  const { getUsers = [] } = data || {};

  const otherUsers = useMemo(() => reject(({ _id }) => _id === details?._id, getUsers), [getUsers]);

  const memoUsers = useMemo(
    () =>
      otherUsers.map(({ _id, name, email }: UserType) => (
        <div key={_id}>
          <p>
            {name} : {email}
          </p>
          <input type="checkbox" onChange={() => onUserClick(_id)} />
        </div>
      )),
    [otherUsers],
  );

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return memoUsers;
};
