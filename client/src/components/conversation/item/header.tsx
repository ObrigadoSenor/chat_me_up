import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { head, map } from 'ramda';
import { useMemo } from 'react';
import styled from 'styled-components';
import { ConversationType } from '../../../../__generated_types__/types';
import { useMembers } from '../../../hooks/useMembers';
import { useMessages } from '../../../hooks/useMessages';
import { Title } from './title';

const Container = styled.div<{ open: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(30, 30, 30, 0.75);
  border-top-right-radius: ${({ open }) => (open ? '0.5rem' : 0)};
  border-top-left-radius: ${({ open }) => (open ? '0.5rem' : 0)};
`;

const HeaderText = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem 0 1rem 1rem;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-left: 1rem;
`;

const TitleList = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  list-style-type: none;
  padding: 0;
`;

const TitleText = styled.span`
  font-size: 1rem;
`;

const LatestMessage = styled.span`
  font-size: 0.65rem;
`;

const MenuOpenBtn = styled.div`
  & > svg {
    padding: 1rem;
  }
`;

const Btn = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
`;

interface HeaderProps extends ConversationType {
  open: boolean;
  setOpenMenu: () => void;
  setOpenMessages: () => void;
}

export const Header = ({ _id, name, _messagesId, setOpenMenu, setOpenMessages, open }: HeaderProps) => {
  const { messages } = useMessages(_messagesId) || {};
  const { members } = useMembers(_id) || {};
  const latestMessage = head(messages);

  const title = useMemo(() => map(({ _userId, _id }) => <Title key={_id} _userId={_userId} />, members), [members]);

  return (
    <Container open={open}>
      <HeaderText>
        <FontAwesomeIcon icon="message" />
        <Text>
          {name ? <TitleText>{name}</TitleText> : <TitleList>{title}</TitleList>}
          {latestMessage && <LatestMessage>{latestMessage.message}</LatestMessage>}
        </Text>
        <Btn onClick={() => setOpenMessages()} />
      </HeaderText>
      <MenuOpenBtn>
        <FontAwesomeIcon onClick={() => setOpenMenu()} icon="ellipsis-vertical" />
      </MenuOpenBtn>
    </Container>
  );
};
