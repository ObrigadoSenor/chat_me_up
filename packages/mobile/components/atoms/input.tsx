/* eslint-disable no-undef */
import { containerStyle, inputContainerStyle, inputStyle } from '@chat_me_up/shared/styles/atoms/input';

import { useState } from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import { Icon, IconProps } from './icon';

const Container = styled.View`
  ${containerStyle}
  margin-bottom: ${({ theme }) => theme.spacings.l};
`;

const InputContainer = styled.View`
  ${inputContainerStyle}
`;

const Inp = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.text.primary,
}))<{ icons: { start: boolean; end: boolean } }>`
  ${inputStyle}
`;

const IconStyled = styled(Icon)`
  margin: 0 10px;
`;

type InputIconProps = Omit<IconProps, 'onPress'> & {
  onPress: (value?: string) => void;
};

type InputIconsProps = {
  start?: InputIconProps;
  end?: InputIconProps;
};

interface InputProps extends TextInputProps {
  icons?: InputIconsProps;
  clearOnClick?: boolean;
}

export const Input = ({ icons = {}, clearOnClick = true, style, ...props }: InputProps) => {
  const [message, setMessage] = useState('');

  const { start, end } = icons || {};

  const onHandleClick = (onPress: InputIconProps['onPress']) => {
    onPress(message);
    if (clearOnClick) {
      setMessage('');
    }
  };

  const startIcon = start ? <IconStyled {...start} onPress={() => onHandleClick(start.onPress)} /> : null;
  const endIcon = end ? <IconStyled {...end} onPress={() => onHandleClick(end.onPress)} /> : null;

  return (
    <Container style={style}>
      <InputContainer>
        {startIcon}

        <Inp
          value={message}
          icons={{ start: startIcon !== null, end: endIcon !== null }}
          onChangeText={(value: string) => setMessage(value)}
          {...props}
        />
        {endIcon}
      </InputContainer>
    </Container>
  );
};
