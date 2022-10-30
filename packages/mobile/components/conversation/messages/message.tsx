import { MessageType } from '@chat_me_up/shared/generated/serverTypes';
import { useUser } from '@chat_me_up/shared/hooks/useUser';
import dayjs from 'dayjs';
import styled from 'styled-components/native';
import { useAppSelector } from '../../../store/store';
import { Text } from '../../atoms/text';

interface MessageProps extends MessageType {
  showTime: boolean;
}

type SelfProps = {
  self: boolean;
};

const Container = styled.View<SelfProps>`
  display: flex;
  flex-direction: column;
  max-width: 65%;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px 15px;
  ${({ self, theme }) =>
    self
      ? `
  align-self: flex-end;
  border-color: ${theme.colors.bg.secondary};
  border-width: 1px;
  background-color: ${theme.colors.bg.primary};
  `
      : `
  align-self: flex-start;
  background-color: ${theme.colors.bg.secondary};
  `};
`;

const ContentContainer = styled.View<SelfProps>`
  text-align: ${({ self }) => (self ? 'end' : 'start')};
`;

const Time = styled(Text)<SelfProps>`
  align-self: ${({ self }) => (self ? 'flex-end' : 'flex-start')};
`;

export const Message = ({ _userId, message, createdAt, showTime }: MessageProps) => {
  const { user } = useAppSelector(({ auth }) => auth);
  const { name } = useUser(_userId);
  const time = createdAt ? dayjs(createdAt).format('H:mm') : null;
  const self = _userId === user?._id;
  return (
    <Container self={self}>
      {!self && <Text size="xs">{name}</Text>}
      <ContentContainer self={self}>
        <Text>{message}</Text>
        {showTime && time ? (
          <Time self={self} size="xs">
            {time}
          </Time>
        ) : null}
      </ContentContainer>
    </Container>
  );
};
