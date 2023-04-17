import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../../screens/SignIn";
import Signup from "../../screens/Signup";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStack;
