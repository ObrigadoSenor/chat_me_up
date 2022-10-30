import { ActivityIndicator, ActivityIndicatorIOSProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
export const Spinner = ({ size = 'large', ...rest }: Omit<ActivityIndicatorIOSProps, 'color'>) => {
  const { theme } = useTheme();
  return <ActivityIndicator size={size} {...rest} color={theme.colors.text.accent} />;
};
