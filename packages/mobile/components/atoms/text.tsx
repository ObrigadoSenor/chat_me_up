import { ColorValue, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
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
  color?: ColorValue;
  width?: 'auto' | '100%';
  size?: number;
}

const T = styled.Text`
  color: 'red';
`;

const InnerText = styled.View<{ border: TextProps['border']; width: TextProps['width'] }>`
  justify-content: center;
  ${({ width }) => (width === '100%' ? 'flex: 1;' : undefined)}
  border-bottom-width: ${({ border }) => (border ? '1px' : 0)};
  border-bottom-color: ${({ border }) => (border ? 'rgba(220, 220, 220, 1)' : 'transparent')};
  ${({ border }) => (border ? 'padding-bottom: 10px; padding-top: 10px;' : undefined)};
`;

export const Text = ({ icons, children, border = false, width, size, ...rest }: TextProps) => {
  const { theme } = useTheme();
  const { start, end } = icons || {};
  const startIcon = start ? <Icon {...start} style={{ marginRight: 15 }} color={theme.colors.text.primary} /> : null;
  const endIcon = end ? <Icon {...end} style={{ marginLeft: 15 }} color={theme.colors.text.primary} /> : null;

  return (
    <Container {...rest}>
      {startIcon}
      <InnerText border={border} width={width}>
        <T style={{ color: theme.colors.text.primary, fontSize: size }}>{children}</T>
      </InnerText>
      {endIcon}
    </Container>
  );
};
