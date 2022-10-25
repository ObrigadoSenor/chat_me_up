import { useSubscription } from '@apollo/client';
import { isEmpty } from 'ramda';
import { useMemo } from 'react';
import styled from 'styled-components';
import { MemberType, MessagesType, Subscription } from '../../../__generated_types__/types';
import { useMembers } from '../../hooks/useMembers';
import { AddMembers } from './addMembers';
import { Member } from './member';
import { MEMBER_ADD_SUBSCRIPTION, MEMBER_REMOVE_SUBSCRIPTION } from './queries';

const MembersContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 0.5rem 0;
  width: 100%;
`;

const MembersAmount = styled.span`
  font-size: 0.75rem;
  padding-left: 0.25rem;
`;

const MemberList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  list-style-type: none;
  width: 100%;
  padding: 0;
  margin: 0.25rem 0;
  border-radius: 0.5rem;
  background-color: rgba(240, 240, 240, 0.3);
  overflow: hidden;
`;

export const Members = ({ _conversationId }: Pick<MessagesType, '_conversationId'>) => {
  let { members, loading, error } = useMembers(_conversationId);

  const { data: friendAddData } = useSubscription<{ memberAdded: Subscription['memberAdded'] }>(
    MEMBER_ADD_SUBSCRIPTION,
  );

  const { memberAdded = {} as MemberType } = friendAddData || {};

  const { data: friendRemoveData } = useSubscription<{ memberRemoved: Subscription['memberRemoved'] }>(
    MEMBER_REMOVE_SUBSCRIPTION,
  );

  const { memberRemoved } = friendRemoveData || {};

  const filteredMembers = useMemo(() => {
    if (memberRemoved !== undefined) {
      members = members.filter(({ _userId }) => _userId !== memberRemoved?._userId);
    } else if (!isEmpty(memberAdded)) {
      members = [...members, memberAdded];
    }
    return members;
  }, [members, memberAdded, memberRemoved]);

  const memoMembers = useMemo(
    () => filteredMembers.map((props: MemberType) => <Member key={props._id} icon="image" {...props} />),
    [filteredMembers],
  );

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <MembersContainer>
      <MembersAmount>{members.length} members</MembersAmount>
      <MemberList>
        <AddMembers _conversationId={_conversationId} members={members} />
        {memoMembers}
      </MemberList>
    </MembersContainer>
  );
};
