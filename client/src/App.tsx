import { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { NewConversation } from './components/conversation/newConversation';
import { Friends } from './components/friend/friends';
import GlobalStyle from './globalStyle';
import { useAppSelector } from './store/store';

const Conversations = lazy(() => import('./components/conversation/conversations'));
const Nav = lazy(() => import('./components/organism/nav'));
const Conversation = lazy(() => import('./components/conversation/conversation'));

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 70px;
  padding: 2rem;
`;

export const App = () => {
  const { enteredConversationId, loggedIn } = useAppSelector(({ conversation, auth }) => ({
    ...conversation,
    ...auth,
  }));
  enteredConversationId;
  return (
    <Container>
      <GlobalStyle />
      <Suspense fallback={<div>Loading...</div>}>
        <Nav />
      </Suspense>
      {loggedIn ? (
        <Content>
          <Friends />

          <NewConversation />
          <Suspense fallback={<div>Loading...</div>}>
            <Conversations />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>{enteredConversationId ? <Conversation /> : null}</Suspense>
        </Content>
      ) : null}
    </Container>
  );
};
