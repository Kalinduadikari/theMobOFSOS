import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './screens/AppNavigator';
import Signup from './screens/Signup';
import SignIn from './screens/SignIn';
import AuthStack from './components/auth/authStack';


export default function App() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}