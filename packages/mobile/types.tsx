/* eslint-disable no-undef */
/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { ConversationType, MessagesType } from '@chat_me_up/shared/generated/serverTypes';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

type ConditionalProps =
  | {
      componentName?: never;
      message?: string;
      variant?: 'text';
    }
  | ({
      variant?: 'conversation';
    } & ConversationType);

export type StackModalScreenType = ConditionalProps & {};

export type StackConversationScreenType = ConversationType & {
  title?: JSX.Element[];
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: StackModalScreenType | undefined;
  NotFound: undefined;
  Conversation: StackConversationScreenType;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Conversations: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
