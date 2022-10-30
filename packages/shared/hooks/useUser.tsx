import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { UserBasicType, UserType } from '../generated/serverTypes';
import { GET_USER } from '../queries/userQueries';

export const useUser = (_id: UserType['_id']) => {
  const { data } = useQuery<{ getUser: UserBasicType }>(GET_USER, { variables: { _id } });

  const user = useMemo(() => data?.getUser, [data]);

  return { ...user } as UserBasicType;
};
