/* eslint-disable no-undef */
import styled from 'styled-components/native';
import { Text, TextProps } from './text';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ theme }) => theme.spacings.l};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.borderRadius.m};
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  margin-bottom: ${({ theme }) => theme.spacings.l};
`;

interface BoxProps {
  children: JSX.Element | JSX.Element[];
  text?: TextProps;
}

export const Box = ({ children, text }: BoxProps) => {
  return (
    <Container>
      {text ? <Text {...text} size="l" /> : null}
      {children}
    </Container>
  );
};
