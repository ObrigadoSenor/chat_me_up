import { useQuery } from '@apollo/client';
import { compose, filter, includes, map, not, propEq } from 'ramda';
import { useEffect, useMemo } from 'react';
import { ConversationType } from '../../__generated_types__/types';
import {
  CONVERSATIONS_ADD_SUBSCRIPTION,
  CONVERSATIONS_DELETE_SUBSCRIPTION,
  CONVERSATIONS_NAME_CHANGE_SUBSCRIPTION,
  GET_CONVERSATIONS,
} from '../components/conversation/queries';
import { MEMBER_REMOVE_SUBSCRIPTION } from '../components/member/queries';
import { useAppSelector } from '../store/store';

export const useConversations = () => {
  const { details } = useAppSelector(({ auth }) => auth);

  const { loading, error, data, subscribeToMore } = useQuery(GET_CONVERSATIONS, {
    variables: { _userId: details?._id },
  });

  useEffect(() => {
    const unsubFromAdd = subscribeToMore({
      document: CONVERSATIONS_ADD_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const { data } = subscriptionData || {};
        if (!data) return prev;

        const { conversationAdded } = data;

        return {
          getConversations: includes(details?._id, conversationAdded.membersIds)
            ? [...prev.getConversations, conversationAdded.data]
            : prev.getConversations,
        };
      },
    });
    const unsubFromDelete = subscribeToMore({
      document: CONVERSATIONS_DELETE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const { data } = subscriptionData || {};
        if (!data) return prev;
        const { conversationDeleted } = data;

        const keppedConversations = filter(
          compose(not, propEq('_id', conversationDeleted.data?._id)),
          prev.getConversations || [],
        );
        return {
          getConversations: includes(details?._id, conversationDeleted.membersIds)
            ? keppedConversations
            : prev.getConversations,
        };
      },
    });
    const unsubFromLeave = subscribeToMore({
      document: MEMBER_REMOVE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const { data } = subscriptionData || {};

        if (!data) return prev;
        const { memberRemoved } = data;

        const keepedMembers = filter(
          (conv: ConversationType) => conv._id !== memberRemoved._conversationId,
          prev.getConversations || [],
        );

        return {
          getConversations: details?._id === memberRemoved._userId ? keepedMembers : prev.getConversations,
        };
      },
    });
    const unsubFromNameChange = subscribeToMore({
      document: CONVERSATIONS_NAME_CHANGE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const { data } = subscriptionData || {};

        if (!data) return prev;
        const { conversationNameChange } = data;

        const updatedConversation = map((conv: ConversationType) => {
          if (conv._id !== conversationNameChange._id) {
            conv.name = conversationNameChange.name;
          }
          return conv;
        }, prev.getConversations || []);

        return {
          getConversations: updatedConversation,
        };
      },
    });

    return () => {
      unsubFromAdd();
      unsubFromDelete();
      unsubFromLeave();
      unsubFromNameChange();
    };
  }, []);
  const { getConversations: conversations = [] } = useMemo(() => data || {}, [data]);

  return { conversations, loading, error };
};
