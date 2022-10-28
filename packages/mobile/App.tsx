/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
import { StatusBar } from 'expo-status-bar';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import icons from '@chat_me_up/shared/icons/globalIcons';
import { ApolloProvider } from '@chat_me_up/shared/providers/apolloProvider';
import { Provider as ReduxProvider } from 'react-redux';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store } from './store/store';
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
          <ReduxProvider store={store}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ReduxProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
