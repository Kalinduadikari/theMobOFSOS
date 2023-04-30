import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Signup from './screens/Signup';
import SignIn from './screens/SignIn';
import AuthStack from './components/auth/authStack';
import { AuthProvider } from "./context/auth";
import LoadFonts from './components/loadFonts';
import { StripeProvider } from '@stripe/stripe-react-native'; 


const STRIPE_KEY = 'pk_test_51N2CTNC5fdwwHhl4oY4WZL34ruqOotPB16ZwyRGdfH0ys2hBuDxrYEkXTyK9cRqdUjrBdrE78OeFkohEW2udMgXS00ypjUYLjc';

export default function App() {
  return (
    <StripeProvider publishableKey={STRIPE_KEY}> 
      <NavigationContainer>
        <AuthProvider>
          <LoadFonts>
            <AuthStack />
          </LoadFonts>
        </AuthProvider>
      </NavigationContainer>
    </StripeProvider>
  );
}
