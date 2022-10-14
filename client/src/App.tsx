/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { Room } from './components/room';
import { Rooms } from './components/rooms';
import GlobalStyle from './globalStyle';
import { useAppSelector } from './store/store';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const App = () => {
  const { enteredRoomId } = useAppSelector(({ room }) => room);
  return (
    <Container>
      <GlobalStyle />
      <Rooms />
      {enteredRoomId ? <Room _id={enteredRoomId} /> : null}
    </Container>
  );
};
