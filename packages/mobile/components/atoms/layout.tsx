/* eslint-disable no-undef */
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ children }: LayoutProps) => {
  return <Container>{children}</Container>;
};
