import { gql, useQuery } from '@apollo/client';
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

export const useUsers = () => {
  const { loading, error, data } = useQuery<{ getUsers: UserBasicType[] }>(GET_USERS);
  const getUsers = useMemo(() => data?.getUsers, [data]) || [];

  return getUsers;
};
