/* eslint-disable indent */
import { useMutation } from '@apollo/client';
import { ConversationBasicType, MemberType, UserType } from '@chat_me_up/shared/generated/serverTypes';
import { useFriends } from '@chat_me_up/shared/hooks/useFriends';
import { ADD_MEMBER } from '@chat_me_up/shared/queries/membersQueries';
import { filter, isEmpty, map } from 'ramda';
import { useMemo, useState } from 'react';
import styled from 'styled-components/native';
import { useAppSelector } from '../../../store/store';
import { Button } from '../../atoms/button';
import { Text } from '../../atoms/text';
import { Member } from './member';

const MembersContainer = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacings.m};
`;

const AddMemberText = styled(Text)<{ open: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: ${({ theme }) => theme.spacings.m};
  box-sizing: border-box;
`;

const FriendList = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ theme }) => theme.spacings.m};
  box-sizing: border-box;
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.m};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.m};
  background-color: rgba(5, 5, 5, 0.15);
`;

interface AddMembersProps extends Pick<ConversationBasicType, '_conversationId'> {
  members: MemberType[];
}

export const AddMembers = ({ _conversationId, members }: AddMembersProps) => {
  const { user } = useAppSelector(({ auth }) => auth);

  const { accepted } = useFriends(user?._id);
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
      <Button title="Add member" icons={{ start: { name: 'add-box', onPress: () => setOpen(!open) } }} />
      {open ? <FriendList>{friendsList}</FriendList> : null}
    </MembersContainer>
  );
};
