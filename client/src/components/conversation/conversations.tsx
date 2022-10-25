import { useQuery } from '@apollo/client';
import { compose, filter, includes, map, not, propEq } from 'ramda';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { ConversationType } from '../../../__generated_types__/types';
import { useAppSelector } from '../../store/store';
import { MEMBER_REMOVE_SUBSCRIPTION } from '../member/queries';
import ConversationsItem from './item/item';
import {
  CONVERSATIONS_ADD_SUBSCRIPTION,
  CONVERSATIONS_DELETE_SUBSCRIPTION,
  CONVERSATIONS_NAME_CHANGE_SUBSCRIPTION,
  GET_CONVERSATIONS,
} from './queries';

const ConversationsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  width: 30%;
  padding: 0;
`;

const Conversations = () => {
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
  const { getConversations = [] } = data || {};
  const memoConversations = useMemo(
    () => getConversations.map((props: ConversationType) => <ConversationsItem key={props._id} {...props} />),
    [getConversations],
  );

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return <ConversationsContainer>{memoConversations}</ConversationsContainer>;
};

export default Conversations;
