/* eslint-disable indent */
import { useMutation } from '@apollo/client';
import { ConversationBasicType, MemberType, UserType } from '@chat_me_up/shared/generated/serverTypes';
import { useFriends } from '@chat_me_up/shared/hooks/useFriends';
import { ADD_MEMBER } from '@chat_me_up/shared/queries/membersQueries';
import { filter, isEmpty, map } from 'ramda';
import { useMemo, useState } from 'react';
import styled from 'styled-components/native';
import { fakeUserId } from '../../../App';
import { Text } from '../../atoms/text';
import { Member } from './member';

const MembersContainer = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

const AddMemberText = styled(Text)<{ open: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px;

  box-sizing: border-box;
  border-radius: 5px;
  background-color: ${({ open }) => (open ? 'rgba(5, 5, 5, 0.15)' : 'transparent')};
  border-bottom-right-radius: ${({ open }) => (open ? '0' : '5px')};
  border-bottom-left-radius: ${({ open }) => (open ? '0' : '5px')};
`;

const FriendList = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: rgba(5, 5, 5, 0.15);
`;

interface AddMembersProps extends Pick<ConversationBasicType, '_conversationId'> {
  members: MemberType[];
}

export const AddMembers = ({ _conversationId, members }: AddMembersProps) => {
  const { accepted } = useFriends(fakeUserId);
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
            icon={{ name: added ? 'check-box' : 'add', onPress: () => (added ? {} : handleAdd(friend._userId)) }}
            {...friend}
          />
        );
      }, accepted),
    [accepted, members],
  );

  return (
    <MembersContainer>
      <AddMemberText open={open} icons={{ start: { name: 'add-box', onPress: () => setOpen(!open) } }}>
        Add member
      </AddMemberText>
      {open ? <FriendList>{friendsList}</FriendList> : null}
    </MembersContainer>
  );
};
