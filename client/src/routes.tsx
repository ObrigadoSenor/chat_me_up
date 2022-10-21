import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes as DomRoutes, Route, Link } from 'react-router-dom';
import { NewConversation } from './components/conversation/newConversation';
import { Friends } from './components/friend/friends';
import { useAppSelector } from './store/store';

const Conversations = lazy(() => import('./components/conversation/conversations'));
const Nav = lazy(() => import('./components/organism/nav'));
const Conversation = lazy(() => import('./components/conversation/conversation'));

export const Routes = () => {
  const { enteredConversationId } = useAppSelector(({ conversation, auth }) => ({
    ...conversation,
    ...auth,
  }));
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Nav />
      </Suspense>
      <DomRoutes>
        <Route path="/" element={<>HOME</>} />
        <Route path="/friends" element={<Friends />} />
        <Route
          path="/conversation"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <>
                <NewConversation />
                <Conversations />
                {enteredConversationId ? <Conversation /> : null}
              </>
            </Suspense>
          }
        />
      </DomRoutes>
    </Router>
  );
};
