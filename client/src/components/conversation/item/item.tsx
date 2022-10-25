import { lazy, Suspense, useState } from 'react';
import styled from 'styled-components';
import { ConversationType } from '../../../../__generated_types__/types';
import { Header } from './header';
const Menu = lazy(() => import('./menu'));
const Conversation = lazy(() => import('./conversation'));
const SendMessage = lazy(() => import('../../message/sendMessage'));

const Container = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(100, 100, 100, 1);
  box-sizing: border-box;
  border-radius: 0.5rem;
  color: white;
  &:not(:first-of-type) {
    margin-top: 0.75rem;
  }
`;

const Item = (props: ConversationType) => {
  const [openMessages, setOpenMessages] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <Container>
      <Header
        {...props}
        setOpenMenu={() => setOpenMenu(!openMenu)}
        setOpenMessages={() => setOpenMessages(!openMessages)}
        open={openMessages || openMenu}
      />
      {openMenu ? (
        <Suspense>
          <Menu {...props} />
        </Suspense>
      ) : null}
      {openMessages ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Conversation {...props} />
          <SendMessage _conversationId={props._id} />
        </Suspense>
      ) : null}
    </Container>
  );
};

export default Item;
