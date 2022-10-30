/* eslint-disable @typescript-eslint/no-explicit-any */

import icons from '@chat_me_up/shared/icons/globalIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ApolloProvider } from '@chat_me_up/shared/providers/apolloProvider';
import { Provider as ReduxProvider } from 'react-redux';
import Content from './Content';
import useCachedResources from './hooks/useCachedResources';
import { store } from './store/store';
{
  icons;
}

export const fakeUserId = '6351ad14b665f50d8f39ecc8';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider>
          <ReduxProvider store={store}>
            <Content />
          </ReduxProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
