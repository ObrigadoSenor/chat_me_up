import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { map } from 'ramda';
import { Icon, IconProps } from '../components/atoms/icon';
import { Text } from '../components/atoms/text';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import ConversationScreen from '../screens/signedIn/ConversationScreen';
import ConversationsScreen from '../screens/signedIn/ConversationsScreen';
import ModalScreen from '../screens/signedIn/ModalScreen';
import ProfileScreen from '../screens/signedIn/ProfileScreen';
import LandingScreen from '../screens/signedOut/LandingScreen';
import { AuthStateProps } from '../store/slices/auth';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation() {
  const { signedIn, loading } = useAuth();

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator signedIn={signedIn} />
    </NavigationContainer>
  );
}

const TitleContainer = styled.View``;
const Title = styled.Text``;

const Stack = createNativeStackNavigator<RootStackParamList>();

function SignedInNavigator() {
  const { theme } = useTheme();
  return (
    <>
      <Stack.Screen name="Root" component={BottomTabSignedInNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="Conversation"
        component={ConversationScreen}
        options={({ navigation, route }) => ({
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerStyle: {
            color: theme.colors.text.primary,
            backgroundColor: theme.colors.bg.primary,
          },
          headerLeft: () => <HeaderBarIcon name="chevron-left" onPress={() => navigation.goBack()} />,
          headerTitle: () => {
            const { title = [] } = route?.params || {};
            const text = map((t) => <Title>{t}</Title>, title);
            return <TitleContainer>{text}</TitleContainer>;
          },
          headerRight: () => (
            <HeaderBarIcon
              name="settings"
              onPress={() => navigation.navigate('Modal', { variant: 'conversation', ...route?.params })}
            />
          ),
        })}
      />
    </>
  );
}

function SignedOutNavigator() {
  return (
    <>
      <Stack.Screen name="Root" component={BottomTabSignedOutNavigator} options={{ headerShown: false }} />
    </>
  );
}

function DefaultNavigator() {
  const { theme } = useTheme();
  return (
    <>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}
      >
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={({ route }: RootTabScreenProps<'Modal'>) => ({
            headerStyle: {
              backgroundColor: theme.colors.bg.modal,
            },
            headerTitle: () => {
              return <Text>{route?.params?.title || 'Modal'}</Text>;
            },
          })}
        />
      </Stack.Group>
    </>
  );
}

function RootNavigator({ signedIn }: { signedIn: AuthStateProps['signedIn'] }) {
  return (
    <Stack.Navigator>
      <>
        {signedIn ? SignedInNavigator() : SignedOutNavigator()}
        <Stack.Group navigationKey={signedIn ? 'user' : 'guest'}>{DefaultNavigator()}</Stack.Group>
      </>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabSignedOutNavigator() {
  const { theme } = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Landing"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.text.disabled,
        tabBarInactiveTintColor: theme.colors.text.accent,
        tabBarStyle: {
          backgroundColor: theme.colors.bg.primary,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: theme.colors.bg.primary,
        },
      }}
    >
      <BottomTab.Screen
        name="Landing"
        component={LandingScreen}
        options={({ navigation }: RootTabScreenProps<'Landing'>) => ({
          title: 'Landing',
          headerTitleStyle: {
            color: theme.colors.text.primary,
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="message" color={color} />,
          headerRight: () => (
            <HeaderBarIcon
              name="login"
              onPress={() => {
                navigation.navigate('Modal', { variant: 'signin', title: 'Sign in' });
              }}
            />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

function BottomTabSignedInNavigator() {
  const { theme } = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Conversations"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.text.accent,
        tabBarInactiveTintColor: theme.colors.text.primary,
        tabBarStyle: {
          backgroundColor: theme.colors.bg.primary,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: theme.colors.bg.primary,
        },
      }}
    >
      <BottomTab.Screen
        name="Conversations"
        component={ConversationsScreen}
        options={({ navigation }: RootTabScreenProps<'Conversations'>) => ({
          title: 'Conversations',
          headerTitleStyle: {
            color: theme.colors.text.primary,
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="message" color={color} />,
          headerRight: () => <HeaderBarIcon name="info" onPress={() => navigation.navigate('Modal')} />,
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="account-box" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: IconProps) {
  return <Icon size={30} {...props} />;
}

function HeaderBarIcon(props: IconProps) {
  const { theme } = useTheme();
  return <Icon size={30} color={theme.colors.text.accent} {...props} />;
}
