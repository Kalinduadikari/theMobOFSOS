import React, { useContext, useState, useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import styled from 'styled-components/native';
import { AuthContext } from "../context/auth";
import { ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';

const CartContainer = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const MiniContainer = styled.View`
  background-color: #f5f5f5;
  height: 650px;
  bottom: -20px;
  padding: 20px;
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
  padding: 10px;
  margin: 10px 20px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0 1px;
  shadow-opacity: 0.18;
  shadow-radius: 1.00px;
`;

const CartItemImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 20px;
`;

const CartItemDetails = styled.View`
  flex: 1;
`;

const CartItemTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  fontFamily: 'Roboto-Bold';
`;

const CartItemPrice = styled.Text`
  font-size: 16px;
  color: #333;
  fontFamily: 'OpenSans-Regular';
`;

const CartItemQuantity = styled.Text`
  font-size: 16px;
  color: #333;
`;

const RemoveButton = styled.TouchableOpacity`
  padding: 5px;
`;

const CartTotal = styled.View`
  margin: 5px 20px;
  align-items: center;
  position: absolute;
  bottom: -96px;
  width: 100%;
  background-color: #fcfcfc;
  padding: 40px;
  border-radius: 38px;
  marginLeft: 0px;
  padding: 10px;
`;

const CartTotalText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  right: 130px;
  bottom: -19px;
  fontFamily: 'OpenSans-Bold';
  
`;

const SubTotalText = styled.Text`
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
  right: 160px;
  opacity: 0.7;
  bottom: -30px;
  font-weight: bold;
  fontFamily: 'Roboto-Bold';
`;

const CheckoutButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #0E122B;
  border-radius: 50px;
  padding-horizontal: 50px;
  padding-vertical: 15px;
  margin-bottom: 20px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.23;
  shadow-radius: 2.62px;
  right: -90px;
  bottom: 46px;
  `;

const CheckoutButtonText = styled.Text `
font-weight: bold; 
text-align: center; 
font-size: 20px; 
color: #ffffff; 
margin-right: 0px;
`;

const ClearCartButton = styled.TouchableOpacity `
background-color: #9d0208; 
padding: 10px 20px; 
border-radius: 50px;
 margin-top: 10px;
 right: 1px;
 bottom: 218px;
 `;

const ClearCartButtonText = styled.Text `
font-size: 18px; 
font-weight: bold; 
color: #fff;
`;

const ShopButton = styled.TouchableOpacity `
background-color: #0E122B; 
padding: 10px 20px; 
border-radius: 50px;
 margin-top: 10px;
 right: -160px;
 bottom: 178px;
 width: 25%;
 alignItems: center;
 `;

const ShopButtonText = styled.Text `
font-size: 18px; 
font-weight: bold; 
color: #fff;
`;


const EmptyCartImage = styled.Image`
  width: 200px;
  height: 200px;
  right: -10px;
  bottom: -90px;
  
`;

const EmptyCartText = styled.Text `
  fontSize: 28px;
  fontFamily: 'SF-Pro-Display-Medium'
  bottom: -160px;
  fontWeight: bold;
`;


const CartScreen = ({ navigation }) => {
const navigate = useNavigation();
const [authState, _, { fetchCartItems, removeItemFromCart, clearCart }] = useContext(AuthContext);
const cart = authState.cart || [];
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
fetchCartItems(() => setIsLoading(false));
}, []);

const renderItem = ({ item }) => (
<CartItem>
<CartItemImage source={{ uri: item.image?.url }} resizeMode="contain" />
<CartItemDetails>
<CartItemTitle>{item.name}</CartItemTitle>
<CartItemPrice>Rs.{item.price}</CartItemPrice>
</CartItemDetails>
<CartItemQuantity>Qty: {item.quantity} <Text style={{ color: "red", fontFamily: "Roboto-Bold" }}>g</Text></CartItemQuantity>
<RemoveButton onPress={() => removeItemFromCart(item.productId)}>
<FontAwesome name="trash-o" size={24} color="#333" />
</RemoveButton>
</CartItem>
);

const renderEmptyList = () => (
<View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
<EmptyCartImage
      
      source={{ uri: 'https://res.cloudinary.com/dnz6ot3ru/image/upload/v1682842597/Screenshot_2023-04-30_at_13.44.26-removebg-preview_wzc3mz.png' }}
    />
<EmptyCartText>
  Your cart is empty.
  </EmptyCartText>
</View>
);

const calculateTotal = () => {
if (!Array.isArray(cart)) {
return 0;
}
return cart.reduce((total, item) => {
  const price = typeof item.price === 'number' ? item.price : 0;
  return total + price;
}, 0);
};

const handleCheckout = () => {
const totalAmount = calculateTotal();
navigate.navigate('Checkout', { totalAmount });
};

if (isLoading) {
return (
<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
<ActivityIndicator size="large" color="#34D399" />
</View>
);
}

return (
    <CartContainer>
      <MiniContainer>
        <FlatList
          data={cart}
          keyExtractor={(item, index) => item._id.toString() + index}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyList}
        />
      </MiniContainer>
      {cart.length > 0 ? (
        <CartTotal>
          <SubTotalText>Total:</SubTotalText>
          <CartTotalText> Rs.{calculateTotal()}</CartTotalText>

          <CheckoutButton onPress={handleCheckout}>
            <CheckoutButtonText>Checkout</CheckoutButtonText>
          </CheckoutButton>

          <ClearCartButton onPress={clearCart}>
            <ClearCartButtonText>Clear Cart</ClearCartButtonText>
          </ClearCartButton>
        </CartTotal>
      ) : (
        <ShopButton onPress={() => navigate.navigate('HomeScreen')}>
          <ShopButtonText>Shop</ShopButtonText>
        </ShopButton>
      )}
    </CartContainer>
  );
};

export default CartScreen;