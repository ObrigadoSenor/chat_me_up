/* eslint-disable no-undef */
import { containerStyle, inputContainerStyle, inputStyle, titleStyle } from '@chat_me_up/shared/styles/atoms/input';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { InputHTMLAttributes, useRef, useState } from 'react';
import { TextInput, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  ${containerStyle}
`;

const InputContainer = styled.View`
  ${inputContainerStyle}
`;

const Inp = styled.TextInput`
  ${inputStyle}
`;

const Title = styled.Text`
  ${titleStyle}
`;

type InputIconProps = {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  onClick: (value?: string) => void;
};

type InputIconsProps = {
  start?: InputIconProps;
  end?: InputIconProps;
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icons?: InputIconsProps;
  clearOnClick?: boolean;
}

const Icon = ({ name, onClick, dir }: InputIconProps & { dir: keyof InputIconsProps }) => (
  <TouchableWithoutFeedback onPress={() => onClick()}>
    <MaterialIcons
      name={name}
      size={20}
      style={{ marginLeft: dir === 'end' ? 20 : 0, marginRight: dir === 'start' ? 20 : 0 }}
    />
  </TouchableWithoutFeedback>
);

export const Input = ({ icons = {}, title, clearOnClick = true, ...props }: InputProps) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<TextInput>(null);

  const { start, end } = icons || {};

  const onHandleClick = (onClick: InputIconProps['onClick']) => {
    onClick(message);
    if (clearOnClick && message !== '') {
      setMessage('');
    }
  };

  const startIcon = start ? <Icon {...start} onClick={() => onHandleClick(start.onClick)} dir="start" /> : null;
  const endIcon = end ? <Icon {...end} onClick={() => onHandleClick(end.onClick)} dir="end" /> : null;

  return (
    <Container>
      {startIcon}
      <InputContainer>
        {title ? <Title>{title}</Title> : null}
        <Inp value={message} {...props} ref={inputRef} onChangeText={(value: string) => setMessage(value)} />
      </InputContainer>
      {endIcon}
    </Container>
  );
};
