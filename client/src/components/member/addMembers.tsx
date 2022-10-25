/* eslint-disable indent */
import { useMutation } from '@apollo/client';
import { filter, isEmpty, map } from 'ramda';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { ConversationBasicType, MemberType, UserType } from '../../../__generated_types__/types';
import { useFriends } from '../../hooks/useFriends';
import { useAppSelector } from '../../store/store';
import { Member } from './member';
import { ADD_MEMBER } from './queries';

const MembersContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const FriendList = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  background-color: rgba(5, 5, 5, 0.75);
`;

interface AddMembersProps extends Pick<ConversationBasicType, '_conversationId'> {
  members: MemberType[];
}

export const AddMembers = ({ _conversationId, members }: AddMembersProps) => {
  const { details } = useAppSelector(({ auth }) => auth);
  const { accepted } = useFriends(details?._id);
  const [open, setOpen] = useState<boolean>(false);
  const [addMember] = useMutation(ADD_MEMBER);

  const handleAdd = async (_userId: UserType['_id']) => {
    return await addMember({ variables: { _conversationId, _userId } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  const friendsList = useMemo(
    () =>
      map((friend) => {
        const added = !isEmpty(filter(({ _userId }) => _userId === friend._userId, members));
        return (
          <Member
            key={friend._userId}
            icon={added ? 'square-check' : 'plus'}
            {...friend}
            onIconClick={() => (added ? {} : handleAdd(friend._userId))}
          />
        );
      }, accepted),
    [accepted, members],
  );

  return (
    <MembersContainer>
      <Member text="Add member" icon="square-plus" onIconClick={() => setOpen(!open)} />
      {open ? <FriendList>{friendsList}</FriendList> : null}
    </MembersContainer>
  );
};
