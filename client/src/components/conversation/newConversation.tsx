import { useMutation } from '@apollo/client';
import { filter, isEmpty, map } from 'ramda';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { FriendType } from '../../../__generated_types__/types';
import { useFriends } from '../../hooks/useFriends';
import { useAppSelector } from '../../store/store';
import { Member } from '../member/member';
import { ADD_CONVERSATION } from './queries';

const FriendsList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  list-style-type: none;
  width: 100%;
  padding: 0;
  margin: 0.25rem 0;
  border-radius: 0.5rem;
  background-color: rgba(240, 240, 240, 1);
  overflow: hidden;
`;

export const NewConversation = () => {
  const { details } = useAppSelector(({ auth }) => auth);
  const [added, setAdded] = useState<FriendType[]>([]);
  const { accepted } = useFriends(details?._id);
  const [createConversation] = useMutation(ADD_CONVERSATION);

  const handleSend = async () => {
    const membersIds = map(({ _userId }) => _userId, added);

    await createConversation({ variables: { membersIds, _userId: details?._id } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  const memoFriends = useMemo(
    () =>
      accepted.map((friend) => {
        const isAdded = !isEmpty(filter(({ _userId }) => _userId === friend._userId, added));
        return (
          <Member
            key={friend._id}
            {...friend}
            icon={isAdded ? 'square-check' : 'plus'}
            onIconClick={() => (isAdded ? {} : setAdded((prev) => [...prev, friend]))}
          />
        );
      }),
    [accepted, added],
  );

  const memoAdded = useMemo(
    () =>
      added.map((friend) => {
        return (
          <Member
            key={friend._id}
            {...friend}
            icon="minus"
            onIconClick={() => setAdded((prev) => filter(({ _userId }) => _userId !== friend._userId, prev))}
          />
        );
      }),
    [added],
  );

  return (
    <div>
      <h1>NEW CONVERSATION</h1>
      <FriendsList>{memoFriends}</FriendsList>
      {memoAdded}
      <button onClick={() => handleSend()}>Create conversation</button>
    </div>
  );
};
