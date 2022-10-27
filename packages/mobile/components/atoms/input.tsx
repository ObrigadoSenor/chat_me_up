/* eslint-disable no-undef */
import { containerStyle, inputContainerStyle, inputStyle, titleStyle } from '@chat_me_up/shared/styles/atoms/input';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { InputHTMLAttributes, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Icon, IconProps } from './icon';

const Container = styled.View`
  ${containerStyle}
`;

const InputContainer = styled.View`
  ${inputContainerStyle}
`;

const Inp = styled.TextInput<{ icons: { start: boolean; end: boolean } }>`
  ${inputStyle}
`;

const Title = styled.Text`
  ${titleStyle}
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

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icons?: InputIconsProps;
  clearOnClick?: boolean;
}

export const Input = ({ icons = {}, title, clearOnClick = true, style, ...props }: InputProps) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<TextInput>(null);

  const { start, end } = icons || {};

  const onHandleClick = (onPress: InputIconProps['onPress']) => {
    onPress(message);
    if (clearOnClick && message !== '') {
      setMessage('');
    }
  };

  const startIcon = start ? <IconStyled {...start} onPress={() => onHandleClick(start.onPress)} /> : null;
  const endIcon = end ? <IconStyled {...end} onPress={() => onHandleClick(end.onPress)} /> : null;

  return (
    <Container style={style}>
      <InputContainer>
        {startIcon}

        {title ? <Title>{title}</Title> : null}
        <Inp
          icons={{ start: startIcon !== null, end: endIcon !== null }}
          value={message}
          {...props}
          ref={inputRef}
          onChangeText={(value: string) => setMessage(value)}
        />
        {endIcon}
      </InputContainer>
    </Container>
  );
};
