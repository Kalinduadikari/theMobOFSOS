import React, { useState, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import usePayment from '../components/usePayment';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from "../context/auth";
import { useNavigation, useFocusEffect } from '@react-navigation/native';


export default function CheckoutScreen() {
    const route = useRoute();
    const totalAmount = route.params.totalAmount;
    const [authState, _, { createOrder, clearCart }] = useContext(AuthContext);
    const navigation = useNavigation();

  
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);

  const { createPaymentIntent } = usePayment();



  const initializePaymentSheet = async (clientSecret) => {
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });

    if (!error) {
      setPaymentSheetEnabled(true);
    } else {
      console.error('Error initializing payment sheet:', error);
    }
  };



  const openPaymentSheet = async (amount) => {
    try {
      const clientSecret = await createPaymentIntent({ amount: amount * 100 });

      if (clientSecret) {
        console.log(clientSecret);
        await initializePaymentSheet(clientSecret);
      } else {
        console.error('Client secret is not available.');
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };
  

  
  const handlePayment = async () => {
    const { error } = await presentPaymentSheet({});
  
    if (error) {
      if (error.message.includes('canceled')) {
        navigation.navigate('CartScreen');
      } else {
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert('Success', 'Your payment was successful!');
      await createOrder(authState.userId, totalAmount);
      await clearCart();
      navigation.navigate('CartScreen');
      setPaymentSheetEnabled(false); // Disable the payment sheet after the successful payment
      openPaymentSheet(route.params.totalAmount); // Reinitialize the payment sheet for the next order with the updated total amount
    }
  };
  
  
  

  useFocusEffect(
    useCallback(() => {
      openPaymentSheet(totalAmount);
    }, [totalAmount])
  );
  


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}></Text>
      <TouchableOpacity
        disabled={!paymentSheetEnabled}
        onPress={handlePayment}
        style={{
          backgroundColor: '#0E122B',
          paddingHorizontal: 80,
          paddingVertical: 15,
          borderRadius: 50,
          bottom: 50,

        }}
      >
        <Text style={{ 
          color: 'white',
          fontSize: 20,
          fontFamily: 'SF-Pro-Display-Bold',
           }}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}