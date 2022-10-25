import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes as DomRoutes } from 'react-router-dom';
import { NewConversation } from './components/conversation/newConversation';
import { Friends } from './components/friend/friends';

const Conversations = lazy(() => import('./components/conversation/conversations'));
const Nav = lazy(() => import('./components/organism/nav'));

export const Routes = () => {
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
              </>
            </Suspense>
          }
        />
      </DomRoutes>
    </Router>
  );
};
