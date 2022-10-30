import { ConversationType } from '@chat_me_up/shared/generated/serverTypes';
import { useMembers } from '@chat_me_up/shared/hooks/useMembers';
import { map } from 'ramda';
import { useMemo } from 'react';
import styled from 'styled-components/native';
import { Box } from '../../atoms/box';
import { AddMembers } from './addMembers';
import { Member } from './member';

const MembersView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin: ${({ theme }) => `${theme.spacings.s} 0 `};
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
    <Box text={{ children: `${members.length} members` }}>
      <MembersView>{memoMembers}</MembersView>
      <AddMembers _conversationId={_id} members={members} />
    </Box>
  );
};
