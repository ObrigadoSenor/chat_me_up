import { gql, useQuery, useSubscription } from '@apollo/client';
import { filter } from 'ramda';
import { useMemo } from 'react';
import { MessagesType, Query, Subscription } from '../../__generated_types__/types';
import { MEMBER_REMOVE_SUBSCRIPTION } from '../components/member/queries';

const GET_MEMBERS = gql`
  query getMembers($_conversationId: String!) {
    getMembers(_conversationId: $_conversationId) {
      _id
      _userId
    }
  }
`;

export const useMembers = (_conversationId: MessagesType['_conversationId']) => {
  const { loading, error, data } = useQuery<{ getMembers: Query['getMembers'] }>(GET_MEMBERS, {
    variables: { _conversationId },
  });

  const { getMembers = [] } = data || {};

  const { data: subMemberRemovedData } = useSubscription<{ memberRemoved: Subscription['memberRemoved'] }>(
    MEMBER_REMOVE_SUBSCRIPTION,
  );

  const { memberRemoved } = subMemberRemovedData || {};

  const members = useMemo(
    () => (memberRemoved ? filter(({ _userId }) => _userId !== memberRemoved._userId, getMembers) : getMembers),
    [getMembers, memberRemoved],
  );
  return { members, loading, error };
};
