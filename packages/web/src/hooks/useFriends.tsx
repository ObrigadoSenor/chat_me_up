import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import { filter, isEmpty, mergeAll } from 'ramda';
import { useMemo } from 'react';
import { FriendType, Query, Subscription, UserType } from '../../__generated_types__/types';
import { FriendsKeyType } from '../components/friend/friends';
import { SEND_FRIEND_REQUEST, UPDATE_FRIEND_REQUEST } from '../components/friend/queries';

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

interface UpdateFriendProps extends FriendType {
  type: FriendsKeyType;
  _userId: UserType['_id'];
  _friendId: UserType['_id'];
  userSubTypeFrom?: FriendsKeyType;
  friendSubTypeFrom?: FriendsKeyType;
  userSubTypeTo?: FriendsKeyType;
  friendSubTypeTo?: FriendsKeyType;
}

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

  const [sendFriendRequestMutation] = useMutation(SEND_FRIEND_REQUEST);

  const sendFriendRequest = async (_friendId: FriendType['_userId']) => {
    return await sendFriendRequestMutation({ variables: { _friendId, _userId } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  const [updateFriendRequestMutation] = useMutation(UPDATE_FRIEND_REQUEST);

  const updateFriendRequest = async (props: UpdateFriendProps) => {
    return await updateFriendRequestMutation({
      variables: { ...props },
    })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  const { accepted = [], rejected = [], pending = [], requests = [] } = friends || {};

  return { friends, accepted, rejected, pending, requests, sendFriendRequest, updateFriendRequest, loading, error };
};
