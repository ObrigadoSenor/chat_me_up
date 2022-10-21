import { gql, useMutation, useQuery } from '@apollo/client';
import { filter, reject } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import { FriendsType, FriendType, UserBasicType } from '../../../__generated_types__/types';
import { useUsers } from '../../hooks/useUsers';
import { useAppSelector } from '../../store/store';
import { Friend } from './friend';

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
    }
  }
`;

// const GET_FRIENDS = gql`
//   query getFriends($_userId: String!, $type: String) {
//     getFriends(_userId: $_userId, type: $type) {
//       _id
//       _userId
//     }
//   }
// `;

const SEND_FRIEND_REQUEST = gql`
  mutation sendFriendRequest($_friendId: String!, $_userId: String!, $userSubType: String, $friendSubType: String) {
    sendFriendRequest(
      _friendId: $_friendId
      _userId: $_userId
      userSubType: $userSubType
      friendSubType: $friendSubType
    ) {
      _id
      _userId
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
    }
  }
`;

export type FriendsKeyType = keyof Omit<FriendsType, '_userId' | '_id'>;

export const Friends = () => {
  const [getFriendsType, setGetFriendsType] = useState<FriendsKeyType>('accepted');
  const users = useUsers();
  const { details } = useAppSelector(({ auth }) => auth);

  const { loading, error, data, subscribeToMore } = useQuery(GET_FRIENDS_NODE, {
    variables: { _userId: details?._id },
  });

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST);

  useEffect(() => {
    const unsubFromRequest = subscribeToMore({
      document: FRIEND_REQUEST_SENT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData = {} }) => {
        const { data } = subscriptionData;
        if (!data?.friendRequestSent) return prev;
        const newGetFriendsNode = filter(({ _userId }) => _userId === details?._id, data.friendRequestSent || []);
        return {
          getFriendsNode: [...prev.getFriendsNode, { ...newGetFriendsNode }],
        };
      },
    });

    return () => {
      unsubFromRequest();
    };
  }, []);

  const sendRequest = async (_friendId: FriendType['_userId']) => {
    return await sendFriendRequest({ variables: { _friendId, _userId: details?._id } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  const { getFriendsNode = {} } = data || {};
  const { [getFriendsType]: friendsList = [] } = getFriendsNode || {};
  const memoFriends = useMemo(
    () =>
      friendsList.map((props: FriendType) => {
        return <Friend key={props._id} _loggedInId={details?._id} {...props} />;
      }),
    [friendsList, details],
  );

  const otherUsers = useMemo(() => reject((user: UserBasicType) => user._id === details?._id, users), [users]);

  const memoUsers = useMemo(
    () =>
      otherUsers.map((user) => (
        <div key={user._id}>
          {user.name}
          <input type="checkbox" onChange={() => sendRequest(user._id)} />
        </div>
      )),
    [otherUsers],
  );

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <>
      <h1>USERS</h1>
      {memoUsers}
      <h1>FRIENDS</h1>
      <h3>{getFriendsType}</h3>
      {memoFriends}
      <button onClick={() => setGetFriendsType('accepted')}>Accepted</button>
      <button onClick={() => setGetFriendsType('pending')}>Pending</button>
      <button onClick={() => setGetFriendsType('requests')}>Requests</button>
    </>
  );
};
