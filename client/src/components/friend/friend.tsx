import { gql, useMutation } from '@apollo/client';
import { FriendType, MutationUpdateFriendRequestArgs, UserType } from '../../../__generated_types__/types';
import { useUser } from '../../hooks/useUser';

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

interface FriendProps extends FriendType {
  _loggedInId?: UserType['_id'];
}

export const Friend = ({ _id, _loggedInId, _userId }: FriendProps) => {
  const { name } = useUser(_userId);

  const [updateFriendRequest] = useMutation(UPDATE_FRIEND_REQUEST);

  const sendRequest = async ({
    userSubTypeFrom,
    friendSubTypeFrom,
    userSubTypeTo,
    friendSubTypeTo,
  }: Partial<MutationUpdateFriendRequestArgs>) => {
    return await updateFriendRequest({
      variables: { _friendId: _userId, _userId: _loggedInId },
    })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  return (
    <div>
      <p>Friend: {name}</p>
      <button onClick={() => sendRequest({})}>Accept</button>

      {/* <p>Creator: {creatorName}</p>
      <p>Status: {status}</p> */}
      {/* {owner && <button onClick={() => sendStatus('removed')}>Removed</button>}
      {!owner && <button onClick={() => sendStatus('decline')}>Declined</button>}
      {!owner && <button onClick={() => sendStatus('removed')}>Removed</button>} */}
    </div>
  );
};
