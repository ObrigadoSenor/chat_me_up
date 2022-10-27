import { ConversationType } from '@chat_me_up/shared/generated/serverTypes';
import { useMembers } from '@chat_me_up/shared/hooks/useMembers';
import { map } from 'ramda';
import { useMemo } from 'react';
import styled, { css } from 'styled-components/native';
import { Text } from '../../atoms/text';
import { AddMembers } from './addMembers';
import { Member } from './member';

const MembersContainer = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  background-color: rgb(230, 230, 230);
`;

const MembersView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin: 5px 0;
  padding: 10px;
`;

export const Members = ({ _id }: Pick<ConversationType, '_id'>) => {
  const { members, loading, error } = useMembers(_id);

  const memoMembers = useMemo(
    () => map((props) => <Member key={props._id} icon={{ name: 'image' }} {...props} />, members),
    [members],
  );

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <MembersContainer>
      <Text>{`${members.length} members`}</Text>
      <AddMembers _conversationId={_id} members={members} />
      <MembersView>{memoMembers}</MembersView>
    </MembersContainer>
  );
};
