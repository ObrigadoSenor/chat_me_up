import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { FriendType, UserType } from '../../__generated_types__/types';

const GET_FRIENDS = gql`
  query getFriends($_userId: String!) {
    getFriends(_userId: $_userId) {
      _id
      _userId
    }
  }
`;

export const useFriends = (_userId: UserType['_id']) => {
  const { loading, error, data, subscribeToMore } = useQuery<{ getFriends: FriendType[] }>(GET_FRIENDS, {
    variables: { _userId },
  });

  const friends = useMemo(() => data?.getFriends, [data]) || [];

  // const pending = filter(({ status }) => status === 'pending', friends);
  // const accepted = filter(({ status }) => status === 'accepted', friends);
  // const declined = filter(({ status }) => status === 'declined', friends);
  // const removed = filter(({ status }) => status === 'declined', friends);

  return { friends };
};
