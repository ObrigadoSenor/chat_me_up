import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { ApolloProvider } from '@chat_me_up/shared/providers/apolloProvider';
import icons from '@chat_me_up/shared/icons/globalIcons';

{
  icons;
}

export const fakeUserId = '6351ad14b665f50d8f39ecc8';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
