/* eslint-disable no-undef */
/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { ConversationType } from '@chat_me_up/shared/generated/serverTypes';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}

export type TokenType = string | null;

export type NavigatorType = {
  colorScheme: NonNullable<ColorSchemeName>;
};

export type StackModalConditionalProps =
  | {
      title: string;
      variant?: 'signup';
    }
  | {
      title: string;
      variant?: 'signin';
    }
  | ({
      title: string;
      variant?: 'conversation';
    } & ConversationType);

export type StackModalScreenType = StackModalConditionalProps & {};

export type StackConversationScreenType = ConversationType & {
  title?: JSX.Element[];
};

export type RootTabParamList = {
  Landing: undefined;
  Modal: StackModalScreenType | undefined;
  Auth: undefined;
  NotFound: undefined;
  Conversations: undefined;
  Conversation: StackConversationScreenType | undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootTabParamList>
>;

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: StackModalScreenType | undefined;
  NotFound: undefined;
  Landing: undefined;
  Auth: undefined;
  Conversation: StackConversationScreenType;
  Conversations: undefined;
  Profile: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootTabParamList> = NativeStackScreenProps<
  RootTabParamList,
  Screen
>;
