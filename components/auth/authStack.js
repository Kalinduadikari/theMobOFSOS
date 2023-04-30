import React, { useContext } from "react";
import SignIn from "../../screens/SignIn";
import Signup from "../../screens/Signup";
import HomeScreen from "../../screens/HomeScreen";
import { AuthContext } from "../../context/auth";
import Header from "../Header";
import Account from "../../screens/Account";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../CustomDrawerContent';
import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import ForgotPassword from "../../screens/ForgotPassword";
import CartScreen from "../../screens/CartScreen";
import ProductDetailsScreen from "../../screens/ProductDetailsScreen";
import CheckoutScreen from '../../screens/CheckoutScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator = () => {
  const [state, _] = useContext(AuthContext);
  const imageUrl = state && state.user && state.user.image && state.user.image.url;
  const name = state && state.user && state.user.name;
  const userEmail = state && state.user && state.user.email;

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} imageUrl={imageUrl} name={name} userEmail={userEmail} />}>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{
        title: 'The Catch Collection',
        headerRight: () => <Header/>
      }}/>
      <Drawer.Screen name="Account" component={Account} options={{}}/>
      <Drawer.Screen name="CartScreen" component={CartScreen} options={{ title: "Cart" }} />
      <Drawer.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
    </Drawer.Navigator>
  );
};


const AuthStack = () => {
  const [state, setState] = useContext(AuthContext);

  const authenticated = state && state.token !== '' && state.user !== null;
  console.log('AUTHENTICATED = > ', authenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authenticated ? (
        <>
          <Stack.Screen name="Root" component={DrawerNavigator} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="AuthSignIn">
            {(props) => (
              <SignIn
                {...props}
                navigation={props.navigation}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Signup">
            {(props) => <Signup {...props} navigation={props.navigation} />}
          </Stack.Screen>

          <Stack.Screen name="ForgotPassword">
            {(props) => <ForgotPassword {...props} navigation={props.navigation} />}
          </Stack.Screen>
        </>
      )}
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};



export default AuthStack;
