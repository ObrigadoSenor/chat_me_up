import { gql, useQuery, useSubscription } from '@apollo/client';
import { useMemo } from 'react';
import { MessagesType, Query, Subscription } from '../generated/serverTypes';
import { MEMBER_ADD_SUBSCRIPTION, MEMBER_REMOVE_SUBSCRIPTION } from '../queries/membersQueries';

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

  const { data: friendAddData } =
    useSubscription<{ memberAdded: Subscription['memberAdded'] }>(MEMBER_ADD_SUBSCRIPTION);

  const { memberAdded } = friendAddData || {};

  const { data: subMemberRemovedData } =
    useSubscription<{ memberRemoved: Subscription['memberRemoved'] }>(MEMBER_REMOVE_SUBSCRIPTION);

  const { memberRemoved } = subMemberRemovedData || {};

  const members = useMemo(() => {
    let members = getMembers;
    if (memberRemoved !== undefined) {
      members = members.filter(({ _userId }) => _userId !== memberRemoved?._userId);
    } else if (memberAdded !== undefined) {
      members = [...members, memberAdded];
    }
    return members;
  }, [getMembers, memberAdded, memberRemoved]);

  return { members, loading, error };
};
