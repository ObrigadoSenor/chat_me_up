import styled from 'styled-components';
import GlobalStyle from './globalStyle';
import { Routes } from './routes';

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
  return (
    <Container>
      <GlobalStyle />
      <Content>
        <Routes />
      </Content>
    </Container>
  );
};
