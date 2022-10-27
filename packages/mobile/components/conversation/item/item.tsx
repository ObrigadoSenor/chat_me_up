import { ConversationType } from '@chat_me_up/shared/generated/serverTypes';
import { useMembers } from '@chat_me_up/shared/hooks/useMembers';
import { useMessages } from '@chat_me_up/shared/hooks/useMessages';

import { itemStyles, startContentTextStyles } from '@chat_me_up/shared/styles/conversation/item';
import { map, reverse } from 'ramda';

import { useNavigation } from '@react-navigation/native';
import { head } from 'ramda';
import { useMemo } from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Title } from './title';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Container = styled.View`
  ${itemStyles}
`;

const StartContentText = styled.View`
  ${startContentTextStyles}
`;

const Item = ({ _id, name, _messagesId }: ConversationType) => {
  const { members } = useMembers(_id) || {};
  const { messages } = useMessages(_messagesId);
  const latestMessage = head(messages);
  const navigation = useNavigation();

  const title = useMemo(
    () => (name ? [<Text>{name}</Text>] : map(({ _userId }) => <Title _userId={_userId} />, members)),
    [members, name],
  );

  const onPress = () => {
    navigation.navigate('Conversation', {
      _messagesId,
      title,
      _conversationId: _id,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container open={true}>
        <MaterialIcons name="message" size={20} />
        <StartContentText>
          {title ? [...title] : null}
          <Text>{latestMessage?.message}</Text>
        </StartContentText>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Item;
