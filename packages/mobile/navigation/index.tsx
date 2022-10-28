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
import { ColorSchemeName, View } from 'react-native';
import styled from 'styled-components/native';

import { map } from 'ramda';
import { Icon } from '../components/atoms/icon';
import { Text } from '../components/atoms/text';
import Colors from '../constants/Colors';
import { useAuth } from '../hooks/useAuth';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import ConversationScreen from '../screens/signedIn/ConversationScreen';
import ConversationsScreen from '../screens/signedIn/ConversationsScreen';
import ModalScreen from '../screens/signedIn/ModalScreen';
import ProfileScreen from '../screens/signedIn/ProfileScreen';
import AuthScreen from '../screens/signedOut/AuthScreen';
import LandingScreen from '../screens/signedOut/LandingScreen';
import { AuthStateProps } from '../store/slices/auth';
import { NavigatorType, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { signedIn, loading } = useAuth();

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator signedIn={signedIn} />
    </NavigationContainer>
  );
}

const TitleContainer = styled.View``;
const Title = styled.Text``;

const Stack = createNativeStackNavigator<RootStackParamList>();

function SignedInNavigator({ colorScheme }: NavigatorType) {
  return (
    <>
      <Stack.Screen name="Root" component={BottomTabSignedInNavigator} options={{ headerShown: false }} />
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
  return (
    <>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </>
  );
}

function RootNavigator({ signedIn }: { signedIn: AuthStateProps['signedIn'] }) {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator>
      <>
        {signedIn ? SignedInNavigator({ colorScheme }) : SignedOutNavigator()}
        <Stack.Group navigationKey={signedIn ? 'user' : 'guest'}>{DefaultNavigator()}</Stack.Group>
      </>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabSignedOutNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Landing"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Landing"
        component={LandingScreen}
        options={({ navigation }: RootTabScreenProps<'Landing'>) => ({
          title: 'Landing',
          tabBarIcon: ({ color }) => <TabBarIcon name="message" color={color} />,
          headerRight: () => (
            <Icon name="info" color={Colors[colorScheme].text} onPress={() => navigation.navigate('Modal')} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Auth"
        component={AuthScreen}
        options={({ navigation }: RootTabScreenProps<'Auth'>) => ({
          title: 'Auth',
          tabBarIcon: ({ color }) => <TabBarIcon name="message" color={color} />,
          headerRight: () => (
            <Icon name="info" color={Colors[colorScheme].text} onPress={() => navigation.navigate('Modal')} />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

function BottomTabSignedInNavigator() {
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
        component={ConversationsScreen}
        options={({ navigation }: RootTabScreenProps<'Conversations'>) => ({
          title: 'Conversations',
          tabBarIcon: ({ color }) => <TabBarIcon name="message" color={color} />,
          headerRight: () => (
            <Icon name="info" color={Colors[colorScheme].text} onPress={() => navigation.navigate('Modal')} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
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
