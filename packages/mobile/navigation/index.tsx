/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components/native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ConversationScreen from '../screens/ConversationScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import Conversations from '../screens/Conversations';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps, StackConversationScreenType } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const HeaderContainer = styled.View`
  height: 100;
  padding: 40px 20px 0px 20px;
  width: 100%;
  background-color: rgba(240, 240, 240, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const HeaderCenter = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderLeft = styled(HeaderCenter)`
  padding: 10px;
`;

const HeaderRight = styled(HeaderLeft)``;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen
        name="Conversation"
        component={ConversationScreen}
        options={{
          headerBackVisible: true,
          headerBackTitleVisible: false,
          header: ({ route, navigation }) => {
            const { title } = (route?.params || {}) as StackConversationScreenType;

            return (
              <HeaderContainer>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                  <HeaderLeft>
                    <MaterialIcons name="chevron-left" size={20} />
                  </HeaderLeft>
                </TouchableWithoutFeedback>

                {title ? <HeaderCenter>{[...title]}</HeaderCenter> : null}
                <HeaderRight>
                  <MaterialIcons name="menu" size={20} />
                </HeaderRight>
              </HeaderContainer>
            );
          },
        }}
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
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <MaterialIcons name="info" size={25} color={Colors[colorScheme].text} style={{ marginRight: 15 }} />
            </Pressable>
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
