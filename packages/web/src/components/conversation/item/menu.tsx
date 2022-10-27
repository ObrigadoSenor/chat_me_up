import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { includes, map } from 'ramda';
import { useMemo } from 'react';
import styled from 'styled-components';
import { ConversationType } from '../../../../__generated_types__/types';
import { useAppSelector } from '../../../store/store';
import { Input } from '../../atoms/input';
import { Members } from '../../member/members';
import { REMOVE_MEMBER } from '../../member/queries';
import { DELETE_CONVERSATION, UPDATE_NAME_OF_CONVERSATION } from '../queries';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(30, 30, 30, 0.75);
  border-top: 1px solid white;
  padding: 1rem;
  box-sizing: border-box;
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
`;

const DeleteLeaveContainer = styled.div`
  padding: 0.25rem 0.5rem;
  font-size: 0.85rem;
  background-color: rgba(240, 240, 240, 0.3);
  border-radius: 0.5rem;
  color: #ee5656;
  & > span {
    margin-left: 1rem;
  }
`;

const ChangeNameContainer = styled.div`
  padding: 0.25rem 0.5rem;
  background-color: rgba(240, 240, 240, 0.3);
  border-radius: 0.5rem;
`;

interface MenuProps extends ConversationType {}

const Menu = ({ _id, name, _adminsIds }: MenuProps) => {
  const { details } = useAppSelector(({ auth }) => auth);

  const [deleteConversation] = useMutation(DELETE_CONVERSATION);
  const [removeMember] = useMutation(REMOVE_MEMBER);
  const [updateNameOfConversation] = useMutation(UPDATE_NAME_OF_CONVERSATION);

  const handleDelete = async () => {
    await deleteConversation({ variables: { _conversationId: _id } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  const handleLeave = async () => {
    await removeMember({ variables: { _userId: details?._id, _conversationId: _id } })
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
        details?._id,
        map(({ _adminId }) => _adminId, _adminsIds),
      ),
    [details, _adminsIds],
  );

  return (
    <Container>
      <ChangeNameContainer>
        <Input
          placeholder="Conversation name"
          defaultValue={name || ''}
          icons={{
            end: { icon: 'image', onClick: (value) => handleChangeName(value) },
          }}
        />
      </ChangeNameContainer>
      <Members _conversationId={_id} />
      <DeleteLeaveContainer>
        <FontAwesomeIcon
          onClick={() => (isAdmin ? handleDelete() : handleLeave())}
          icon={isAdmin ? 'delete-left' : 'arrow-right-from-bracket'}
        />
        <span>{isAdmin ? 'Delete' : 'Leave'} conversation</span>
      </DeleteLeaveContainer>
    </Container>
  );
};

export default Menu;
