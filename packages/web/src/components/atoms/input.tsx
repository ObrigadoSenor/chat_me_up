/* eslint-disable no-undef */
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputHTMLAttributes, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const InpContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  background-color: white;
  height: 2.5rem;
  border-radius: 0.25rem;
`;

const Inp = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 0.75rem;
  border: none;
  box-sizing: border-box;
  background-color: transparent;
`;

const Title = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.25rem 0.75rem;
  border: none;
  box-sizing: border-box;
  font-size: 0.8rem;
  color: black;
`;

type InputIconProps = {
  icon: IconProp;
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

const Icon = ({ icon, onClick, dir }: InputIconProps & { dir: keyof InputIconsProps }) => (
  <FontAwesomeIcon
    icon={icon}
    onClick={() => onClick()}
    style={{ marginLeft: dir === 'end' ? '1rem' : 0, marginRight: dir === 'start' ? '1rem' : 0 }}
  />
);

export const Input = ({ icons = {}, title, clearOnClick, ...props }: InputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { start, end } = icons;

  const onHandleClick = (onClick: InputIconProps['onClick']) => {
    onClick(inputRef?.current?.value);
    if (clearOnClick && inputRef.current) {
      inputRef.current.value = '';
    }
  };
  const startIcon = start ? <Icon {...start} onClick={() => onHandleClick(start.onClick)} dir="start" /> : null;
  const endIcon = end ? <Icon {...end} onClick={() => onHandleClick(end.onClick)} dir="end" /> : null;

  return (
    <Container>
      {startIcon}
      <InpContainer>
        {title ? <Title>{title}</Title> : null}
        <Inp {...props} ref={inputRef}></Inp>
      </InpContainer>
      {endIcon}
    </Container>
  );
};
