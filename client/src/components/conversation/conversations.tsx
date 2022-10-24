import { gql, useMutation, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose, filter, includes, not, propEq } from 'ramda';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { ConversationType } from '../../../__generated_types__/types';
import { setConversationId } from '../../store/slices/conversation';
import { useAppDispatch, useAppSelector } from '../../store/store';
import ConversationsItem from './conversationsItem';

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

const DELETE_CONVERSATION = gql`
  mutation deleteConversation($_conversationId: String!) {
    deleteConversation(_conversationId: $_conversationId) {
      _id
      name
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
  const disaptch = useAppDispatch();
  const { details } = useAppSelector(({ auth }) => auth);

  const { loading, error, data, subscribeToMore } = useQuery(GET_CONVERSATIONS, {
    variables: { _userId: details?._id },
  });

  const [deleteConversation] = useMutation(DELETE_CONVERSATION);

  const handleDelete = async (_conversationId: ConversationType['_id']) => {
    await deleteConversation({ variables: { _conversationId } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

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
    () => getConversations.map((props: ConversationType) => <ConversationsItem key={props._id} {...props} />),
    [getConversations],
  );

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <>
      <h1>CONVERSATIONS</h1>
      <ConversationsContainer>{memoConversations}</ConversationsContainer>
    </>
  );
};

export default Conversations;
