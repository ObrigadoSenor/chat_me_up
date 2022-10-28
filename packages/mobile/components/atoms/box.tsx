/* eslint-disable no-undef */
import styled from 'styled-components/native';
import { Text, TextProps } from './text';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: rgba(5, 5, 5, 0.15);
  margin-bottom: 20px;
`;

const StyledText = styled(Text)`
  padding: 10px 0 20px 0;
  width: 100%;
  justify-content: center;
`;

interface BoxProps {
  children: JSX.Element | JSX.Element[];
  text?: TextProps;
}

export const Box = ({ children, text }: BoxProps) => {
  return (
    <Container>
      {text ? <StyledText {...text} size={16} /> : null}
      {children}
    </Container>
  );
};
