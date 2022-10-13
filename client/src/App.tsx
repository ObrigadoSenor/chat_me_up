/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import GlobalStyle from './globalStyle';
import { Rooms } from './components/rooms';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const App = () => {
  // const disaptch = useAppDispatch();
  // const { value } = useAppSelector(({ template }) => template);
  return (
    <Container>
      <GlobalStyle />
      {/* <Button onClick={() => disaptch(decrement())}>Decrement</Button>
      <Value>{value}</Value>
      <Button onClick={() => disaptch(increment())}>Increment</Button> */}
      <div className="App">
        <Rooms />
      </div>
    </Container>
  );
};
