import { MessagesType, MessageType } from '@chat_me_up/shared/generated/serverTypes';
import { useMessages } from '@chat_me_up/shared/hooks/useMessages';
import dayjs, { Dayjs } from 'dayjs';
import { head } from 'ramda';
import { useRef } from 'react';
import styled from 'styled-components/native';
import { Text } from '../../atoms/text';
import { Message } from './message';

const MessagesFlatList = styled.FlatList`
  width: 100%;
`;

const MessagesDay = styled.View`
  margin: ${({ theme }) => `${theme.spacings.l} 0`};
  align-items: center;
  width: 100%;
`;

const sameMin = (from?: number, to?: number) => dayjs(from).isSame(dayjs(to), 'minute');
const sameDay = (from?: number, to?: number) => dayjs(from).isSame(dayjs(to), 'day');
const isToday = (d?: number) => dayjs(d).isSame(dayjs(), 'day');

export const Messages = ({ _id }: Pick<MessagesType, '_id'>) => {
  const flatListRef = useRef(null);

  const { messages } = useMessages(_id) || {};

  const renderItem = ({ item, index }: { item: MessageType; index: number }) => {
    const { createdAt } = item || {};
    const first = head(messages)?.createdAt;
    const next = messages[index + 1]?.createdAt;
    const prev = messages[index - 1]?.createdAt;

    let showTime = false;
    if (index === 0) {
      showTime = true;
    } else if (sameMin(createdAt, first)) {
      showTime = false;
    } else if (next && prev) {
      showTime = sameMin(next, createdAt) && !sameMin(prev, createdAt);
    }

    const showDate = next ? !sameDay(createdAt, next) : false;

    let day;
    if (showDate) {
      day = isToday(createdAt) ? 'Today' : dayjs(createdAt).format('ddd, D MMM');
    }

    return (
      <>
        {showDate && day ? (
          <MessagesDay>
            <Text color="accent" size="l">
              {day}
            </Text>
          </MessagesDay>
        ) : null}
        <Message showTime={showTime} {...item} />
      </>
    );
  };

  return (
    <MessagesFlatList
      ref={flatListRef}
      inverted
      contentContainerStyle={{ paddingTop: 30, paddingBottom: 30, flexDirection: 'column' }}
      data={messages}
      renderItem={renderItem}
      keyExtractor={({ _id }: MessageType) => _id}
    />
  );
};
