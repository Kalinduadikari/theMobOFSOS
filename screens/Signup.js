import React, { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import UserInput from "../components/auth/UserInput";
import SmBtn from "../components/auth/SmBtn";
import axios from "axios";
import RoundLogo from "../components/auth/RoundLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const SignUpContainer = styled.View`
  flex: 1;
  background-color: #ebeaee;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #333;
  margin-top: 100px;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
  align-self: center;
`;

const TextLink = styled.Text`
color: #0A8791;
font-size: 14px;
font-weight: bold;
margin-top: -7px;
text-align: center;
width: 100%;
align-self: center;
`;

const InnerContainer = styled.View`
  padding: 50px;
`;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  //context
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
  
    try {
      const { data } = await axios.post(`/users/signup`, {
        name,
        email,
        password,
      });

      if(data.error) {
        alert(data.error);
        setLoading(false);
      }else{
      //save to context
      setState(data);
      //save response in async storage
      await AsyncStorage.setItem('@auth', JSON.stringify(data));
      console.log("SIGNUP RESPONSE", data);
      setLoading(false);
      alert("Sign Up Successful");
      navigation.navigate('Root', { screen: 'AuthSignIn' });
      
      }
    } catch (err) {
      alert("Sign Up failed. Try again");
      console.log("SIGNUP ERROR", err);
      setLoading(false);
    }
  };
  
  return (
    <SignUpContainer>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <InnerContainer>
          <Title>Create Account</Title>
          <Text style={styles.secondText}>Please enter your data to continue</Text>
          <UserInput
            name="Name"
            value={name}
            setValue={setName}
            autoCapitalize="words"
            autoCorrect={false}
            iconName="user"
          />

          <UserInput
            name="Email"
            value={email}
            setValue={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            iconName="envelope"
          />

          <UserInput
            name="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            iconName="lock"
            iconSize={27}
          />

          <SmBtn title="Sign Up" handleSubmit={handleSubmit} loading={loading} />
      <Text style={styles.text}>
        Already registered?{" "}
        <Text onPress={() => navigation.navigate("AuthSignIn")} style={styles.link}>
          Sign In
        </Text>


      </Text>
      <Text style={styles.footerText}>
        By creating an account, you agree to our          <Text onPress={() => navigation.navigate("Terms")} style={styles.link}>
        Terms and Conditions
        </Text>
      </Text>
    </InnerContainer>
  </KeyboardAwareScrollView>
</SignUpContainer>
);
};

const styles = StyleSheet.create({
container: {
flexGrow: 1,
},
innerContainer: {
alignItems: "center",
},
title: {
fontSize: 34,
fontWeight: "bold",
marginTop: 30,
marginBottom: 40,
},
text: {
fontSize: 14,
marginTop: 20,
color: "#333",
textAlign: "center",
},
link: {
color: "#0A8791",
fontWeight: "bold",
},
linkText: {
color: "#333",
fontSize: 16,
marginTop: 20,
alignSelf: "flex-end",
},
secondText:{
color: "grey",
textAlign: "center",
marginBottom: 78,
},
footerText: {
color: "grey",
textAlign: "center",
marginTop: 140,
}
});

export default Signup;

