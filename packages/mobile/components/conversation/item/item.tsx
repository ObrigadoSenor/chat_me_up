import { ConversationType } from '@chat_me_up/shared/generated/serverTypes';
import { useMembers } from '@chat_me_up/shared/hooks/useMembers';
import { useMessages } from '@chat_me_up/shared/hooks/useMessages';

import { itemStyles, startContentTextStyles } from '@chat_me_up/shared/styles/conversation/item';
import { map } from 'ramda';

import { useNavigation } from '@react-navigation/native';
import { head } from 'ramda';
import { useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Icon } from '../../atoms/icon';
import { Text } from '../../atoms/text';
import { Title } from './title';

const Container = styled.View`
  ${itemStyles}
`;

const StartContentText = styled.View`
  ${startContentTextStyles}
`;

const Item = (props: ConversationType) => {
  const { _id, name, _messagesId } = props || {};

  const { members } = useMembers(_id) || {};
  const { messages } = useMessages(_messagesId);
  const latestMessage = head(messages);
  const navigation = useNavigation();

  const title = useMemo(
    () => (name ? [<Text size="l">{name}</Text>] : map(({ _userId }) => <Title _userId={_userId} />, members)),
    [members, name],
  );

  const onPress = () => {
    navigation.navigate('Conversation', {
      title,
      ...props,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container open={true}>
        <Icon name="message" />
        <StartContentText>
          {title ? [...title] : null}
          <Text>{latestMessage?.message || ''}</Text>
        </StartContentText>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Item;
