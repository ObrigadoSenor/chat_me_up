/* eslint-disable no-undef */

import { ButtonProps as RNButtonProps, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Text, TextProps } from './text';

const ButtonContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.bg.accent};
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 100%;
  flex-direction: row;
  border-radius: 5px;
`;

const TextStyled = styled(Text)`
  width: 100%;
  justify-content: center;
  padding: ${({ theme }) => theme.spacings.s};
`;

interface ButtonProps extends Omit<RNButtonProps, 'color'>, Omit<TextProps, 'children'> {}

export const Button = ({ icons = {}, title, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity {...props}>
      <ButtonContainer>
        <TextStyled icons={icons}>{title}</TextStyled>
      </ButtonContainer>
    </TouchableOpacity>
  );
};
