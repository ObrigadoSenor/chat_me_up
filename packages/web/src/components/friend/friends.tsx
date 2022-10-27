import { findIndex } from 'ramda';
import { useMemo } from 'react';
import styled from 'styled-components';
import { FriendsType, FriendType } from '../../../__generated_types__/types';
import { useFriends } from '../../hooks/useFriends';
import { useUsers } from '../../hooks/useUsers';
import { useAppSelector } from '../../store/store';
import { Friend } from './friend';

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
  const { details } = useAppSelector(({ auth }) => auth);

  const { userWithoutSelf } = useUsers(details?._id);

  const { accepted, pending, rejected, requests, sendFriendRequest, loading, error } = useFriends(details?._id);

  const renderFriend = (friendsArray: FriendType[], type: FriendsKeyType) =>
    friendsArray.map((props) => {
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
          {accepted ? <FriendsInnerUl>{renderFriend(accepted, 'accepted')}</FriendsInnerUl> : null}
        </FriendsOuterLi>
        <FriendsOuterLi>
          <h4>Pending</h4>
          {pending ? <FriendsInnerUl>{renderFriend(pending, 'pending')}</FriendsInnerUl> : null}
        </FriendsOuterLi>
        <FriendsOuterLi>
          <h4>Requests</h4>
          {requests ? <FriendsInnerUl>{renderFriend(requests, 'requests')}</FriendsInnerUl> : null}
        </FriendsOuterLi>
        <FriendsOuterLi>
          <h4>Rejected</h4>
          {rejected ? <FriendsInnerUl>{renderFriend(rejected, 'rejected')}</FriendsInnerUl> : null}
        </FriendsOuterLi>
      </FriendsOuterUl>
    ),
    [accepted, pending, rejected, requests, details],
  );

  const memoUsers = useMemo(
    () =>
      userWithoutSelf.map(({ _id, name, email }) => {
        const checkIfAdded = (arr: FriendType[]) => findIndex((req) => req._userId === _id, arr) > -1;

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
              <button onClick={() => sendFriendRequest(_id)}>Add as friend</button>
            )}
          </div>
        );
      }),
    [userWithoutSelf],
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
