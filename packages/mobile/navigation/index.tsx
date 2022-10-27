/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import styled from 'styled-components/native';

import { map } from 'ramda';
import { Icon } from '../components/atoms/icon';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Conversations from '../screens/Conversations';
import ConversationScreen from '../screens/ConversationScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const TitleContainer = styled.View``;
const Title = styled.Text``;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen
        name="Conversation"
        component={ConversationScreen}
        options={({ navigation, route }) => ({
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Icon name="chevron-left" color={Colors[colorScheme].text} onPress={() => navigation.goBack()} />
          ),
          headerTitle: () => {
            const { title = [] } = route?.params || {};
            const text = map((t) => <Title>{t}</Title>, title);
            return <TitleContainer>{text}</TitleContainer>;
          },
          headerRight: () => (
            <Icon
              name="settings"
              color={Colors[colorScheme].text}
              onPress={() => navigation.navigate('Modal', { variant: 'conversation', ...route?.params })}
            />
          ),
        })}
      />

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Conversations"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Conversations"
        component={Conversations}
        options={({ navigation }: RootTabScreenProps<'Conversations'>) => ({
          title: 'Conversations',
          tabBarIcon: ({ color }) => <TabBarIcon name="message" color={color} />,
          headerRight: () => (
            <Icon name="info" color={Colors[colorScheme].text} onPress={() => navigation.navigate('Modal')} />
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialIcons>['name']; color: string }) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}
