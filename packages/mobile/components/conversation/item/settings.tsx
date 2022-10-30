import { useMutation } from '@apollo/client';
import { ConversationType } from '@chat_me_up/shared/generated/serverTypes';
import { DELETE_CONVERSATION, UPDATE_NAME_OF_CONVERSATION } from '@chat_me_up/shared/queries/conversationQueries';
import { REMOVE_MEMBER } from '@chat_me_up/shared/queries/membersQueries';
import { includes, map } from 'ramda';
import { useMemo } from 'react';
import { useAppSelector } from '../../../store/store';
import { Button } from '../../atoms/button';
import { Input } from '../../atoms/input';
import { Layout } from '../../atoms/layout';
import { Members } from '../members/members';

export const Settings = ({ _id, name, _adminsIds = [] }: ConversationType) => {
  const { user } = useAppSelector(({ auth }) => auth);
  const [deleteConversation] = useMutation(DELETE_CONVERSATION);
  const [removeMember] = useMutation(REMOVE_MEMBER);
  const [updateNameOfConversation] = useMutation(UPDATE_NAME_OF_CONVERSATION);

  const handleDelete = async () => {
    await deleteConversation({ variables: { _conversationId: _id } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  const handleLeave = async () => {
    await removeMember({ variables: { _userId: user?._id, _conversationId: _id } })
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
        user?._id,
        map(({ _adminId }) => _adminId, _adminsIds),
      ),
    [_adminsIds],
  );
  return (
    <Layout>
      <Input
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
      <Button
        title={isAdmin ? 'Delete conversation' : 'Leave conversation'}
        icons={{
          start: {
            name: isAdmin ? 'remove-circle' : 'exit-to-app',
            onPress: () => (isAdmin ? handleDelete() : handleLeave()),
          },
        }}
      />
    </Layout>
  );
};
