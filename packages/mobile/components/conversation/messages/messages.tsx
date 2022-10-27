import { MessagesType, MessageType } from '@chat_me_up/shared/generated/serverTypes';
import { useMessages } from '@chat_me_up/shared/hooks/useMessages';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Message } from './message';

const MessagesFlatList = styled.FlatList`
  width: 100%;
`;

const MessagesDay = styled.View`
  font-size: 12px;
  margin: 10px 0;
  align-items: center;
  width: 100%;
`;

export const Messages = ({ _id }: Pick<MessagesType, '_id'>) => {
  const flatListRef = useRef(null);

  const { messages } = useMessages(_id) || {};
  const _userId = '6351ad14b665f50d8f39ecc8';

  const renderItem = ({ item, index }: { item: MessageType; index: number }) => {
    const { createdAt } = item || {};
    const next = messages[index + 1]?.createdAt;

    const showTime = next ? !dayjs(createdAt).isSame(dayjs(next), 'minute') : false;

    const showDate = next ? !dayjs(createdAt).isSame(dayjs(next), 'day') : false;

    let day;
    if (showDate) {
      day = dayjs(createdAt).isSame(dayjs(), 'day') ? 'Today' : dayjs(createdAt).format('ddd, D MMM');
    }

    return (
      <>
        {showDate && day ? (
          <MessagesDay>
            <Text>{day}</Text>
          </MessagesDay>
        ) : null}
        <Message self={item._userId === _userId} showTime={showTime} {...item} />
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
