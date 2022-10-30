import { SharedThemeFontSizesProps, SharedThemeTextProps } from '@chat_me_up/shared/styles/theme';
import { TextProps as RNTextProps } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '../../hooks/useTheme';
import { Icon, IconProps } from './icon';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export interface TextProps extends RNTextProps {
  children: string;
  icons?: {
    start?: IconProps;
    end?: IconProps;
  };
  border?: boolean;
  color?: keyof SharedThemeTextProps;
  width?: 'auto' | '100%';
  size?: keyof SharedThemeFontSizesProps;
}

const T = styled.Text`
  justify-content: center;
`;

const InnerText = styled.View<{ border: TextProps['border']; width: TextProps['width'] }>`
  justify-content: center;
  ${({ width }) => (width === '100%' ? 'flex: 1;' : undefined)}
  ${({ border, theme }) =>
    border
      ? `padding: ${theme.spacings.m} 0; border-bottom-color: ${theme.colors.text.primary}; border-bottom-width: 1px;`
      : undefined};
`;

export const Text = ({ icons, children, border = false, width, size = 'm', color = 'primary', ...rest }: TextProps) => {
  const { theme } = useTheme();
  const { start, end } = icons || {};
  const startIcon = start ? <Icon {...start} style={{ marginRight: 15 }} color={theme.colors.text[color]} /> : null;
  const endIcon = end ? <Icon {...end} style={{ marginLeft: 15 }} color={theme.colors.text[color]} /> : null;

  return (
    <Container {...rest}>
      {startIcon}
      <InnerText border={border} width={width}>
        <T style={{ color: theme.colors.text[color], fontSize: theme.fontSizes[size] }}>{children}</T>
      </InnerText>
      {endIcon}
    </Container>
  );
};
