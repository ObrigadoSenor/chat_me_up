import { gql, useQuery, useSubscription } from '@apollo/client';
import dayjs from 'dayjs';
import { last, reverse } from 'ramda';
import { Fragment, useMemo } from 'react';
import styled from 'styled-components';
import { Query, Subscription } from '../../../__generated_types__/types';
import { useAppSelector } from '../../store/store';
import { Message } from './message';

const GET_MESSAGES = gql`
  query getMessage($_conversationId: String!) {
    getMessage(_conversationId: $_conversationId) {
      _id
      _userId
      message
      createdAt
    }
  }
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription OnNewMessage {
    messageSent {
      _id
      _conversationId
      messages {
        _id
        _userId
        message
        createdAt
      }
    }
  }
`;

const MessagesUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column-reverse;
  margin: 0;
  padding: 0;
  width: 100%;
  list-style-type: none;
`;

const MessagesDay = styled.span`
  font-size: 0.65rem;
  margin-top: 0.5rem;
`;

export const Messages = () => {
  const { enteredConversationId: _conversationId, details } = useAppSelector(({ conversation, auth }) => ({
    ...conversation,
    ...auth,
  }));
  const {
    loading,
    error,
    data: initData,
  } = useQuery<{ getMessage: Query['getMessage'] }>(GET_MESSAGES, {
    variables: { _conversationId },
  });

  const { data: subData } = useSubscription<{ messageSent: Subscription['messageSent'] }>(MESSAGES_SUBSCRIPTION);
  const { getMessage = [] } = initData || {};

  const messages = useMemo(
    () =>
      subData === undefined || subData.messageSent._conversationId !== _conversationId
        ? getMessage
        : subData.messageSent.messages,
    [subData, getMessage],
  );
  let messageShowTimeIndex = 0;
  const revMessage = reverse(messages);

  const memoMessages = useMemo(
    () =>
      revMessage.map((props, index) => {
        const { createdAt } = props || {};
        const { createdAt: lastCreatedAt } = revMessage[messageShowTimeIndex] || {};

        let showDate;

        if (lastCreatedAt) {
          showDate = dayjs(createdAt).isBefore(dayjs(lastCreatedAt), 'day');
          dayjs(createdAt).isBefore(dayjs(lastCreatedAt), 'minute') ? (messageShowTimeIndex = index) : null;
        }

        const day = dayjs(lastCreatedAt).isSame(dayjs(), 'day') ? 'Today' : dayjs(lastCreatedAt).format('ddd, D MMM');

        return (
          <Fragment key={props._id}>
            {showDate && <MessagesDay key={props.createdAt}>{day}</MessagesDay>}
            <Message self={props._userId === details?._id} showTime={index === messageShowTimeIndex} {...props} />
          </Fragment>
        );
      }),
    [revMessage],
  );

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return <MessagesUl>{memoMessages}</MessagesUl>;
};
