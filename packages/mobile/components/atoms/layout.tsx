/* eslint-disable no-undef */
import { SharedThemeBgProps } from '@chat_me_up/shared/styles/theme';
import styled from 'styled-components/native';

const Container = styled.View<{ bgVariant: LayoutProps['bgVariant'] }>`
  background-color: ${({ theme, bgVariant = 'primary' }) => theme.colors.bg[bgVariant]};
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
`;

interface LayoutProps {
  children: JSX.Element | JSX.Element[] | (JSX.Element | null)[] | null;
  bgVariant?: keyof SharedThemeBgProps;
}

export const Layout = ({ children, bgVariant }: LayoutProps) => {
  return <Container bgVariant={bgVariant}>{children}</Container>;
};
