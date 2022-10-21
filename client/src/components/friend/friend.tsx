/* eslint-disable indent */
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { FriendType, UserBasicType, UserType } from '../../../__generated_types__/types';
import { useUser } from '../../hooks/useUser';
import { FriendsKeyType } from './friends';

const UPDATE_FRIEND_REQUEST = gql`
  mutation updateFriendRequest(
    $_friendId: String!
    $_userId: String!
    $userSubTypeFrom: String
    $friendSubTypeFrom: String
    $userSubTypeTo: String
    $friendSubTypeTo: String
  ) {
    updateFriendRequest(
      _friendId: $_friendId
      _userId: $_userId
      userSubTypeFrom: $userSubTypeFrom
      friendSubTypeFrom: $friendSubTypeFrom
      userSubTypeTo: $userSubTypeTo
      friendSubTypeTo: $friendSubTypeTo
    ) {
      _id
      _userId
    }
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid grey;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  &:not(:last-of-type) {
    margin-right: 1rem;
  }
`;

interface FriendProps extends FriendType {
  type: FriendsKeyType;
  _loggedInId?: UserType['_id'];
}

type ApprovalTypes = {
  userSubTypeFrom: FriendsKeyType;
  friendSubTypeFrom: FriendsKeyType;
  userSubTypeTo: FriendsKeyType;
  friendSubTypeTo: FriendsKeyType;
};

const accept: ApprovalTypes = {
  userSubTypeFrom: 'requests',
  friendSubTypeFrom: 'pending',
  userSubTypeTo: 'accepted',
  friendSubTypeTo: 'accepted',
};

const reject: ApprovalTypes = {
  userSubTypeFrom: 'requests',
  friendSubTypeFrom: 'pending',
  userSubTypeTo: 'rejected',
  friendSubTypeTo: 'rejected',
};

export const Friend = ({ _loggedInId, _userId, type }: FriendProps) => {
  const user = useUser(_userId);

  const [updateFriendRequest] = useMutation(UPDATE_FRIEND_REQUEST);

  const sendRequest = async (props: Partial<ApprovalTypes>) => {
    return await updateFriendRequest({
      variables: { _friendId: _userId, _userId: _loggedInId, ...props },
    })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  switch (type) {
    case 'pending':
      return (
        <PendingFriend
          {...user}
          sendRequest={(approval) =>
            sendRequest({ ...approval, userSubTypeFrom: 'pending', friendSubTypeFrom: 'requests' })
          }
        />
      );
    case 'requests':
      return <RequestFriend {...user} sendRequest={(approval) => sendRequest({ ...approval })} />;
    case 'rejected':
      return <RejectedFriend {...user} />;
    case 'accepted':
    default:
      return (
        <AcceptedFriend
          {...user}
          sendRequest={(approval) =>
            sendRequest({ ...approval, userSubTypeFrom: 'accepted', friendSubTypeFrom: 'accepted' })
          }
        />
      );
  }
};

const renderFriendInformation = ({ name, email }: Pick<UserBasicType, 'email' | 'name'>) => {
  return (
    <>
      <Item>{name}</Item>
      <Item>{email}</Item>
    </>
  );
};

interface DefaultFriendProps extends UserBasicType {
  sendRequest: (approval: ApprovalTypes) => void;
}

interface AcceptedFriendType extends DefaultFriendProps {}

const AcceptedFriend = ({ name, email, sendRequest }: AcceptedFriendType) => {
  return (
    <Container>
      {renderFriendInformation({ name, email })}
      <Item>{<button onClick={() => sendRequest(reject)}>Remove</button>}</Item>
    </Container>
  );
};

interface PendingFriendType extends DefaultFriendProps {}

const PendingFriend = ({ name, email, sendRequest }: PendingFriendType) => {
  return (
    <Container>
      {renderFriendInformation({ name, email })}
      <Item>
        <button onClick={() => sendRequest(reject)}>Remove</button>
      </Item>
    </Container>
  );
};
interface RequestFriendType extends DefaultFriendProps {}

const RequestFriend = ({ name, email, sendRequest }: RequestFriendType) => {
  return (
    <Container>
      {renderFriendInformation({ name, email })}
      <Item>
        <button onClick={() => sendRequest(accept)}>Accept</button>
      </Item>
      <Item>
        <button onClick={() => sendRequest(reject)}>Decline</button>
      </Item>
    </Container>
  );
};

interface RejectedFriendType extends Omit<DefaultFriendProps, 'sendRequest'> {}

const RejectedFriend = ({ name, email }: RejectedFriendType) => {
  return <Container>{renderFriendInformation({ name, email })}</Container>;
};
