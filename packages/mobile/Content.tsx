import { StatusBar } from 'expo-status-bar';
import icons from '@chat_me_up/shared/icons/globalIcons';
import { ThemeProvider } from 'styled-components/native';
import { useTheme } from './hooks/useTheme';
import Navigation from './navigation';
{
  icons;
}

export default function Content() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <StatusBar />
    </ThemeProvider>
  );
}
