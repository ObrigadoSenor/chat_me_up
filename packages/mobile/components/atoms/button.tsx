/* eslint-disable no-undef */

import { ButtonProps as RNButtonProps, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Text, TextProps } from './text';

const ButtonContainer = styled.View`
  background-color: rgba(240, 240, 240, 1);
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 60%;
  flex-direction: row;
  border-radius: 5px;
  padding: 10px;
`;

const TextStyled = styled(Text)`
  width: 100%;
  justify-content: center;
`;

interface ButtonProps extends RNButtonProps, Omit<TextProps, 'children'> {}

export const Button = ({ icons = {}, title, ...props }: ButtonProps) => {
  return (
    <ButtonContainer>
      <TouchableOpacity {...props}>
        <TextStyled icons={icons}>{title}</TextStyled>
      </TouchableOpacity>
    </ButtonContainer>
  );
};
