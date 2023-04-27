import React, { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import styled from 'styled-components/native';

const CartContainer = styled.View`
  flex: 1;
  background-color: #F3F3F3;
`;

const CartHeader = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #333;
  margin-top: 50px;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
  align-self: center;
`;

const CartItem = styled.View`
  background-color: #fff;
  padding: 20px;
  margin: 10px 20px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CartItemText = styled.Text`
  font-size: 16px;
  color: #333;
`;

const CartTotal = styled.View`
  background-color: #fff;
  padding: 20px;
  margin: 10px 20px;
  border-radius: 10px;
  align-items: center;
`;

const CartTotalText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const CheckoutButton = styled.TouchableOpacity`
  background-color: #34D399;
  padding: 10px 20px;
  border-radius: 5px;
`;

const CheckoutButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([    { id: 1, name: "Item 1", price: 10 },    { id: 2, name: "Item 2", price: 20 },    { id: 3, name: "Item 3", price: 30 },  ]);

  const renderItem = ({ item }) => (
    <CartItem>
      <CartItemText>{item.name}</CartItemText>
      <CartItemText>${item.price}</CartItemText>
    </CartItem>
  );

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    // Handle checkout process
  };

  return (
    <CartContainer>
      <CartHeader>My Cart</CartHeader>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <CartTotal>
        <CartTotalText>Total: ${calculateTotal()}</CartTotalText>
        <CheckoutButton onPress={handleCheckout}>
          <CheckoutButtonText>Checkout</CheckoutButtonText>
        </CheckoutButton>
      </CartTotal>
    </CartContainer>
  );
};

export default CartScreen;
