/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Conversations: {
            screens: {
              Conversations: 'one',
            },
          },
          Profile: {
            screens: {
              Profile: 'two',
            },
          },
          Landing: {
            screens: {
              Landing: 'one',
            },
          },
          Auth: {
            screens: {
              Auth: 'two',
            },
          },
        },
      },
      Modal: 'modal',
      Conversation: 'conversation',
      NotFound: '*',
    },
  },
};

export default linking;
