import dayjs from 'dayjs';
import styled from 'styled-components';
import { MessageType } from '../../../__generated_types__/types';
import { useUser } from '../../hooks/useUser';

interface MessageProps extends MessageType {
  self: boolean;
  showTime: boolean;
}

const MessageLi = styled.li<Pick<MessageProps, 'self'>>`
  display: flex;
  flex-direction: column;
  align-self: ${({ self }) => (self ? 'flex-end' : 'flex-start')};
  max-width: 65%;
  margin-top: 0.75rem;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: rgb(245, 245, 245);
  background-color: ${({ self }) => `rgba(${self ? '40, 40, 40, 0.75' : '10, 10, 10, 0.75'})`};
`;

const ContentContainer = styled.div<Pick<MessageProps, 'self'>>`
  text-align: ${({ self }) => (self ? 'end' : 'start')};
`;

const Self = styled.span`
  font-size: 0.65rem;
`;

const Text = styled.span`
  font-size: 0.95rem;
`;

const Time = styled.span`
  font-size: 0.65rem;
  margin-left: 0.5rem;
`;

export const Message = ({ _userId, message, createdAt, self, showTime }: MessageProps) => {
  const { name } = useUser(_userId);

  const time = dayjs(createdAt).format('H:mm');
  return (
    <MessageLi self={self}>
      {!self && <Self>{name}</Self>}

      <ContentContainer self={self}>
        <Text>{message}</Text>
        {showTime && <Time>{time}</Time>}
      </ContentContainer>
    </MessageLi>
  );
};
