/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
import { StatusBar } from 'expo-status-bar';

import icons from '@chat_me_up/shared/icons/globalIcons';
import { ThemeProvider } from 'styled-components/native';

import useColorScheme from './hooks/useColorScheme';
import { useTheme } from './hooks/useTheme';
import Navigation from './navigation';
{
  icons;
}

export const fakeUserId = '6351ad14b665f50d8f39ecc8';

export default function Content() {
  const { theme } = useTheme();
  console.log('theme', theme);

  const colorScheme = useColorScheme();

  return (
    <ThemeProvider theme={theme}>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </ThemeProvider>
  );
}
