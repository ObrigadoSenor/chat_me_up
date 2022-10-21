import { gql, useQuery } from '@apollo/client';
import { compose, filter, includes, not, propEq } from 'ramda';
import { useEffect, useMemo } from 'react';
import { ConversationType } from '../../../__generated_types__/types';
import { setConversationId } from '../../store/slices/conversation';
import { useAppDispatch, useAppSelector } from '../../store/store';

const GET_CONVERSATIONS = gql`
  query getConversations($_userId: String!) {
    getConversations(_userId: $_userId) {
      _id
      name
      _membersId
      _messagesId
    }
  }
`;

const CONVERSATIONS_SUBSCRIPTION = gql`
  subscription OnNewConversation {
    conversationAdded {
      data {
        _id
        name
        _membersId
        _messagesId
      }
      membersIds
    }
  }
`;

const CONVERSATIONS_DELETE_SUBSCRIPTION = gql`
  subscription OnDeleteConversation {
    conversationDeleted {
      data {
        _id
        name
        _membersId
        _messagesId
      }
      membersIds
    }
  }
`;

const Conversations = () => {
  const disaptch = useAppDispatch();
  const { details } = useAppSelector(({ auth }) => auth);

  const { loading, error, data, subscribeToMore } = useQuery(GET_CONVERSATIONS, {
    variables: { _userId: details?._id },
  });

  useEffect(() => {
    const unsubFromAdd = subscribeToMore({
      document: CONVERSATIONS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const { data } = subscriptionData || {};
        if (!data) return prev;

        const { conversationAdded } = data;

        if (includes(details?._id, conversationAdded.membersIds)) {
          return {
            getConversations: [...prev.getConversations, conversationAdded.data],
          };
        }
        return {
          getConversations: prev.getConversations,
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

        if (includes(details?._id, conversationDeleted.membersIds)) {
          disaptch(setConversationId(null));

          return {
            getConversations: keppedConversations,
          };
        }
        return {
          getConversations: prev.getConversations,
        };
      },
    });
    return () => {
      unsubFromAdd();
      unsubFromDelete();
    };
  }, []);

  const { getConversations = [] } = data || {};

  const memoConversations = useMemo(
    () =>
      getConversations.map(({ _id, name }: ConversationType) => (
        <div key={_id}>
          <button onClick={() => disaptch(setConversationId(_id))}>{name}</button>
        </div>
      )),
    [getConversations],
  );

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <>
      <h1>CONVERSATIONS</h1>
      {memoConversations}
    </>
  );
};

export default Conversations;
