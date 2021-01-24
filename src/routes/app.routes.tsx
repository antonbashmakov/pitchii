import React, { useState } from 'react';
import { StatusBar, Platform } from 'react-native';

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeButton from '../components/HomeButton';
import Discover from '../pages/Discover';
import Home from '../pages/Home';
import Inbox from '../pages/Inbox';
import Me from '../pages/Me';
import Record from '../pages/Record';
import SignupPhone from '../pages/SignupPhone';
import SignupPhoneVerification from '../pages/SignupPhoneVerification';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignupPhone"
        component={SignupPhone}
        options={{ title: 'Sign up' }}
      />
      <Stack.Screen
        name="SignupPhoneVerification"
        component={SignupPhoneVerification}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
};

const AppRoutes: React.FC = () => {
  const [home, setHome] = useState(true);

  StatusBar.setBarStyle('dark-content');

  if (Platform.OS === 'android') StatusBar.setBackgroundColor('#fff');

  if (home) {
    StatusBar.setHidden(true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#fff');
      StatusBar.setBarStyle('light-content');
    }
  } else {
    StatusBar.setHidden(false);
  }

  return (
    <Tab.Navigator
      shifting={false}
      barStyle={{
        backgroundColor: home ? '#000' : '#fff',
      }}
      initialRouteName="Home"
      activeColor={home ? '#fff' : '#000'}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        listeners={{
          focus: () => setHome(true),
          blur: () => setHome(false),
        }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Live"
        component={Record}
        listeners={({ navigation }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigation.navigate('Record');
          },
        })}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => <HomeButton home={home} />,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="message-text-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={Me}
        options={{
          tabBarLabel: 'Me',
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootStackScreen: React.FC = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Auth"
        component={AuthRoutes}
      />
      <Stack.Screen
        name="Main"
        component={AppRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Record"
        component={Record}
      />
    </Stack.Navigator>
  );
};

export default RootStackScreen;
