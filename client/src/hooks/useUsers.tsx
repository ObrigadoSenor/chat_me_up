import { gql, useQuery } from '@apollo/client';
import { reject } from 'ramda';
import { useMemo } from 'react';
import { UserBasicType, UserType } from '../../__generated_types__/types';

const GET_USERS = gql`
  query getUsers {
    getUsers {
      _id
      name
      email
    }
  }
`;

export const useUsers = (_id?: UserType['_id']) => {
  const { data } = useQuery<{ getUsers: UserBasicType[] }>(GET_USERS);
  const users = useMemo(() => data?.getUsers, [data]) || [];

  const userWithoutSelf = useMemo(() => reject((user: UserBasicType) => user._id === _id, users), [users]);

  return { users, userWithoutSelf };
};
