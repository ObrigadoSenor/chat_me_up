import { useMutation } from '@apollo/client';
import { ConversationType } from '@chat_me_up/shared/generated/serverTypes';
import { DELETE_CONVERSATION, UPDATE_NAME_OF_CONVERSATION } from '@chat_me_up/shared/queries/conversationQueries';
import { REMOVE_MEMBER } from '@chat_me_up/shared/queries/membersQueries';
import { includes, map } from 'ramda';
import { useMemo } from 'react';
import styled from 'styled-components/native';
import { fakeUserId } from '../../../App';
import { Input } from '../../atoms/input';
import { Text } from '../../atoms/text';
import { Members } from '../members/members';

const Container = styled.View`
  flex-direction: column;
  flex: 1;
  padding: 20px;
`;

const ChangeName = styled(Input)`
  margin-bottom: 20px;
`;

const DeleteLeave = styled(Text)`
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  background-color: rgb(146, 54, 54);
`;

export const Settings = ({ _id, name, _adminsIds = [], ...rest }: ConversationType) => {
  const [deleteConversation] = useMutation(DELETE_CONVERSATION);
  const [removeMember] = useMutation(REMOVE_MEMBER);
  const [updateNameOfConversation] = useMutation(UPDATE_NAME_OF_CONVERSATION);

  const handleDelete = async () => {
    await deleteConversation({ variables: { _conversationId: _id } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  const handleLeave = async () => {
    await removeMember({ variables: { _userId: fakeUserId, _conversationId: _id } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  const handleChangeName = async (name?: string) => {
    await updateNameOfConversation({ variables: { name, _conversationId: _id } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  const isAdmin = useMemo(
    () =>
      includes(
        fakeUserId,
        map(({ _adminId }) => _adminId, _adminsIds),
      ),
    [_adminsIds],
  );
  return (
    <Container>
      <ChangeName
        placeholder="Conversation name"
        defaultValue={name || ''}
        icons={{
          end: {
            name: 'image',
            onPress: (value) => handleChangeName(value),
          },
        }}
      />
      <Members _id={_id} />
      <DeleteLeave
        color="white"
        icons={{
          start: {
            name: isAdmin ? 'remove-circle' : 'exit-to-app',
            onPress: () => (isAdmin ? handleDelete() : handleLeave()),
          },
        }}
      >
        {isAdmin ? 'Delete conversation' : 'Leave conversation'}
      </DeleteLeave>
    </Container>
  );
};
