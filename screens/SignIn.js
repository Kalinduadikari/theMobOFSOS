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
import { Animated } from 'react-native';


const SignInContainer = styled.View`
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

const ForgotPasswordContainer = styled.View`
  margin-top: 20px;
  align-items: flex-end;
`;

const ForgotPasswordText = styled.Text`
  color: #333;
  font-size: 16px;
`;








const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //context
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    console.log("SIGNIN REQUEST =>", email, password);

    try {
      const { data } = await axios.post(`/users/signin`, {
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        //save in context
        setState(data);
        //save response in async storage
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        setLoading(false);
        console.log("SIGN IN SUCCESS = >", data);
        //redirect
        navigation.navigate("HomeScreen");
      }
    } catch (err) {
      alert("Sign In failed. Try again");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <SignInContainer>
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <InnerContainer>
        <Title>Welcome!</Title>
        <Text style={styles.secondText}>Please enter your data to continue</Text>
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
        <SmBtn title="Sign In" handleSubmit={handleSubmit} loading={loading} />
        <Text style={styles.text}>
          Not yet registered?{" "}
          <Text onPress={() => navigation.navigate("Signup")} style={styles.link}>
            Sign Up
          </Text>
        </Text>
        <ForgotPasswordContainer>
          <TextLink onPress={() => navigation.navigate("ForgotPassword")}>Forgot Password?</TextLink>
        </ForgotPasswordContainer>
        <Text style={styles.footerText}>
          By connecting your account confirm that you agree with our {""}  <Text onPress={() => navigation.navigate("Signup")} style={styles.link}>
          Terms and Condition
          </Text>
        </Text>
      </InnerContainer>
    </KeyboardAwareScrollView>
  </SignInContainer>
  
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
    marginTop: 200,

  }

});


export default SignIn;
