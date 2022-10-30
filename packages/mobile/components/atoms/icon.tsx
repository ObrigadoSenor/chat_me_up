import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ComponentProps } from 'react';
import { Pressable } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface IconProps extends ComponentProps<typeof MaterialIcons> {
  onPress?: () => void;
}

export const Icon = ({ size = 25, onPress, color, ...rest }: IconProps) => {
  const { theme } = useTheme();
  const i = <MaterialIcons size={size} color={color || theme.colors.text.accent} {...rest} />;
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        {i}
      </Pressable>
    );
  }
  return i;
};
