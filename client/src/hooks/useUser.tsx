import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { UserBasicType, UserType } from '../../__generated_types__/types';

export const GET_USER = gql`
  query getUser($_id: String!) {
    getUser(_id: $_id) {
      _id
      name
      email
    }
  }
`;

export const useUser = (_id: UserType['_id']) => {
  const { loading, error, data } = useQuery<{ getUser: UserBasicType }>(GET_USER, { variables: { _id } });

  const getUser = useMemo(() => data?.getUser, [data]);

  return { ...getUser } as UserBasicType;
};
