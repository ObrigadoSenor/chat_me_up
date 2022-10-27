import dayjs from 'dayjs';
import { Fragment, useMemo } from 'react';
import styled from 'styled-components';
import { MessagesType } from '../../../__generated_types__/types';
import { useAppSelector } from '../../store/store';
import { Message } from './message';

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

export const Messages = ({ messages }: Pick<MessagesType, 'messages'>) => {
  const { details } = useAppSelector(({ auth }) => auth);

  const memoMessages = useMemo(() => {
    let messageShowTimeIndex = 0;
    return messages.map((props, index) => {
      const { createdAt } = props || {};
      const { createdAt: lastCreatedAt } = messages[messageShowTimeIndex] || {};

      let showDate;

      if (lastCreatedAt) {
        showDate = dayjs(createdAt).isBefore(dayjs(lastCreatedAt), 'day');
        if (dayjs(createdAt).isBefore(dayjs(lastCreatedAt), 'minute')) {
          messageShowTimeIndex = index;
        }
      }

      const day = dayjs(lastCreatedAt).isSame(dayjs(), 'day') ? 'Today' : dayjs(lastCreatedAt).format('ddd, D MMM');

      return (
        <Fragment key={props._id}>
          {showDate && <MessagesDay key={props.createdAt}>{day}</MessagesDay>}
          <Message self={props._userId === details?._id} showTime={index === messageShowTimeIndex} {...props} />
        </Fragment>
      );
    });
  }, [messages, details]);

  return <MessagesUl>{memoMessages}</MessagesUl>;
};
