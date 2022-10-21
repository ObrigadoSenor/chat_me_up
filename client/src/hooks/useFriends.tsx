import { gql, useQuery, useSubscription } from '@apollo/client';
import { filter, isEmpty, mergeAll } from 'ramda';
import { useMemo } from 'react';
import { Query, Subscription, UserType } from '../../__generated_types__/types';

const GET_FRIENDS_NODE = gql`
  query getFriendsNode($_userId: String!) {
    getFriendsNode(_userId: $_userId) {
      _id
      _userId
      pending {
        _id
        _userId
      }
      requests {
        _id
        _userId
      }
      accepted {
        _id
        _userId
      }
      rejected {
        _id
        _userId
      }
    }
  }
`;

const FRIEND_REQUEST_SENT_SUBSCRIPTION = gql`
  subscription OnNewFriendRequest {
    friendRequestSent {
      _id
      _userId
      pending {
        _id
        _userId
      }
      requests {
        _id
        _userId
      }
      accepted {
        _id
        _userId
      }
      rejected {
        _id
        _userId
      }
    }
  }
`;

export const useFriends = (_userId?: UserType['_id']) => {
  const {
    loading,
    error,
    data: initData,
  } = useQuery<{ getFriendsNode: Query['getFriendsNode'] }>(GET_FRIENDS_NODE, {
    variables: { _userId },
  });

  const { data: subData } = useSubscription<{ friendRequestSent: Subscription['friendRequestSent'] }>(
    FRIEND_REQUEST_SENT_SUBSCRIPTION,
  );

  const filteredSubData = mergeAll(filter((friend) => friend._userId === _userId, subData?.friendRequestSent || []));

  const friends = useMemo(
    () => (!isEmpty(filteredSubData) ? filteredSubData : initData?.getFriendsNode),
    [filteredSubData, initData],
  );

  return { friends, loading, error };
};
