import { ColorValue, StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import styled from 'styled-components/native';
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
}

const InnerText = styled.View<{ border: TextProps['border'] }>`
  justify-content: center;
  border-bottom-width: ${({ border }) => (border ? '1px' : 0)};
  border-bottom-color: ${({ border }) => (border ? 'rgba(220, 220, 220, 1)' : 'transparent')};
  padding-bottom: ${({ border }) => (border ? '10px' : 0)};
  padding-top: ${({ border }) => (border ? '10px' : 0)};
  flex: 1;
`;

export const Text = ({ icons, children, border = false, color, ...rest }: TextProps) => {
  const { start, end } = icons || {};
  const startIcon = start ? <Icon {...start} style={{ marginRight: 15 }} color={color} /> : null;
  const endIcon = end ? <Icon {...end} style={{ marginLeft: 15 }} color={color} /> : null;

  return (
    <Container {...rest}>
      {startIcon}
      <InnerText border={border}>
        <RNText style={{ color }}>{children}</RNText>
      </InnerText>
      {endIcon}
    </Container>
  );
};
