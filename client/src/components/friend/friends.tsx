/* eslint-disable indent */
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import { filter, find, findIndex, flatten, includes, isEmpty, map, mergeAll, reject } from 'ramda';
import { useMemo } from 'react';
import styled from 'styled-components';
import { FriendsType, FriendType, Query, Subscription, UserBasicType } from '../../../__generated_types__/types';
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
      rejected {
        _id
        _userId
      }
    }
  }
`;

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
      rejected {
        _id
        _userId
      }
    }
  }
`;

const FriendsOuterUl = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

const FriendsOuterLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 1rem;
  padding: 0;
  width: 100%;
  border: 1px solid rgba(230, 230, 230);
  border-radius: 0.5rem;

  & > h4 {
    text-align: center;
    width: 100%;
    background-color: rgba(230, 230, 230);
    margin: 0;
    padding: 1rem 0;
  }
`;

const FriendsInnerUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
`;

const FriendsInnerLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 2rem);
  margin: 0 1rem;
  margin-top: 1rem;
  &:last-of-type {
    margin-bottom: 1rem;
  }
`;

export type FriendsKeyType = keyof Omit<FriendsType, '_userId' | '_id'>;

export const Friends = () => {
  const users = useUsers();
  const { details } = useAppSelector(({ auth }) => auth);

  const {
    loading,
    error,
    data: initData,
  } = useQuery<{ getFriendsNode: Query['getFriendsNode'] }>(GET_FRIENDS_NODE, {
    variables: { _userId: details?._id },
  });

  const { data: subData } = useSubscription<{ friendRequestSent: Subscription['friendRequestSent'] }>(
    FRIEND_REQUEST_SENT_SUBSCRIPTION,
  );

  const filteredSubData = mergeAll(filter(({ _userId }) => _userId === details?._id, subData?.friendRequestSent || []));

  const data = !isEmpty(filteredSubData) ? filteredSubData : initData?.getFriendsNode;

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST);

  const sendRequest = async (_friendId: FriendType['_userId']) => {
    return await sendFriendRequest({ variables: { _friendId, _userId: details?._id } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  const renderFriend = (friends: FriendType[], type: FriendsKeyType) =>
    friends.map((props) => {
      return (
        <FriendsInnerLi key={props._id}>
          <Friend _loggedInId={details?._id} type={type} {...props} />
        </FriendsInnerLi>
      );
    });

  const memoFriends = useMemo(
    () => (
      <FriendsOuterUl>
        <FriendsOuterLi>
          <h4>Accepted</h4>
          {data?.accepted ? <FriendsInnerUl>{renderFriend(data.accepted, 'accepted')}</FriendsInnerUl> : null}
        </FriendsOuterLi>
        <FriendsOuterLi>
          <h4>Pending</h4>
          {data?.pending ? <FriendsInnerUl>{renderFriend(data.pending, 'pending')}</FriendsInnerUl> : null}
        </FriendsOuterLi>
        <FriendsOuterLi>
          <h4>Requests</h4>
          {data?.requests ? <FriendsInnerUl>{renderFriend(data.requests, 'requests')}</FriendsInnerUl> : null}
        </FriendsOuterLi>
        <FriendsOuterLi>
          <h4>Rejected</h4>
          {data?.rejected ? <FriendsInnerUl>{renderFriend(data.rejected, 'rejected')}</FriendsInnerUl> : null}
        </FriendsOuterLi>
      </FriendsOuterUl>
    ),
    [data, details],
  );

  const allFriends = useMemo(
    () => (data !== undefined ? flatten([data.accepted, data.pending, data.requests]) : []),
    [data],
  );

  const allFriendsIds = useMemo(() => map((props) => props?._userId, allFriends), [allFriends]);

  const usersExcludedLoggedIn = useMemo(
    () => reject((user: UserBasicType) => user._id === details?._id, users),
    [users, allFriendsIds],
  );

  const memoUsers = useMemo(
    () =>
      usersExcludedLoggedIn.map(({ _id, name, email }) => {
        const checkIfAdded = (arr: FriendType[]) => findIndex((req) => req._userId === _id, arr) > -1;
        const { requests = [], pending = [], accepted = [], rejected = [] } = data || {};

        const isRequested = checkIfAdded(requests);
        const isPending = checkIfAdded(pending);
        const isAccepted = checkIfAdded(accepted);
        // const isRejected = checkIfAdded(rejected);

        return (
          <div key={_id}>
            {name}
            {email}
            {isRequested ? 'Requested' : null}
            {isPending ? 'Pending' : null}
            {isAccepted ? 'Accepted' : null}
            {/* {isRejected ? 'Rejected' : null} */}

            {isRequested || isPending || isAccepted ? null : (
              <button onClick={() => sendRequest(_id)}>Add as friend</button>
            )}
          </div>
        );
      }),
    [usersExcludedLoggedIn],
  );

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <>
      <h1>USERS</h1>
      {memoUsers}
      <h1>FRIENDS</h1>
      {memoFriends}
    </>
  );
};
