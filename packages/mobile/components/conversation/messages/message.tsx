import { MessageType } from '@chat_me_up/shared/generated/serverTypes';
import { useUser } from '@chat_me_up/shared/hooks/useUser';
import dayjs from 'dayjs';
import styled from 'styled-components/native';

interface MessageProps extends MessageType {
  self: boolean;
  showTime: boolean;
}

const Container = styled.View<Pick<MessageProps, 'self'>>`
  display: flex;
  flex-direction: column;
  align-self: ${({ self }) => (self ? 'flex-end' : 'flex-start')};
  max-width: 65%;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px 20px;
  color: rgb(245, 245, 245);
  background-color: ${({ self }) => `rgba(${self ? '40, 40, 40, 0.75' : '10, 10, 10, 0.75'})`};
`;

const ContentContainer = styled.View<Pick<MessageProps, 'self'>>`
  text-align: ${({ self }) => (self ? 'end' : 'start')};
`;

const Name = styled.Text`
  font-size: 12px;
`;

const Text = styled.Text``;

const Time = styled.Text<Pick<MessageProps, 'self'>>`
  font-size: 12px;
  align-self: ${({ self }) => (self ? 'flex-end' : 'flex-start')};
`;

export const Message = ({ _userId, message, createdAt, self, showTime }: MessageProps) => {
  const { name } = useUser(_userId);
  const time = createdAt ? dayjs(createdAt).format('H:mm') : null;

  return (
    <Container self={self}>
      {!self && <Name>{name}</Name>}
      <ContentContainer self={self}>
        <Text>{message}</Text>
        {showTime && <Time self={self}>{time}</Time>}
      </ContentContainer>
    </Container>
  );
};
