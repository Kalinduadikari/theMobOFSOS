import React, { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import UserInput from "../components/auth/UserInput";
import SmBtn from "../components/auth/SmBtn";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from 'styled-components/native';
 



const ForgotPasswordContainer = styled.View`
  flex: 1;
  background-color: #F3F3F3;
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

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [resetCode, setResetCode] = useState("");



  
  const handleSubmit = async () => {
    setLoading(true);
    if (!email) {
      alert("Email field is required");
      setLoading(false);
      return;
    }
    console.log("FORGOT PASSWORD REQUEST =>", email);

    try {
      const { data } = await axios.post(`/users/forgot-password`, {
        email,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        setVisible(true);
        console.log("FORGOT PASSWORD SUCCESS = >", data);
        alert("✅Password reset link has been sent to your email");
      }
    } catch (err) {
      alert("Forgot password failed. Try again");
      console.log(err);
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    console.log("HANDLE PASSWORD RESET => ", email, password, resetCode);
    try{
       const {data} = await axios.post('/users/reset-password', {
        email, password, resetCode,
       });
       console.log("RESET PASSWORD => ", data);
       if(data.error){
        alert(data.error);
        setLoading(false);
       }else {
        alert("Now you can login with your new password");
        navigation.navigate('AuthSignIn');

       }
    }catch(err){
        console.log(err);
        setLoading(false);
        alert("Password reset is failed. Try again");
    }
  };

  return (
    <ForgotPasswordContainer>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <InnerContainer>
          <Title>Forgot Password</Title>
          <Text style={styles.secondText}>
            Please enter your email address to receive a password reset link
          </Text>
          <UserInput
            name="Email"
            value={email}
            setValue={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            iconName="envelope"
          />

            {visible && (
                <>
                <UserInput
                    name="New Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    iconName="lock"
                    iconSize={27}
                    />
                <UserInput
                    name="Reset Code"
                    value={resetCode}
                    setValue={setResetCode}
                    autoCapitalize="none"
                    iconName="lock"
                    iconSize={27}
              />
            </>
            )}

          <SmBtn 
            title={
            visible ? "Reset Password" : "Send Reset Code"} 
            handleSubmit={visible ? handlePasswordReset :  handleSubmit} 
            loading={loading} />
          <Text style={styles.text}>
            Remembered your password?{" "}
            <Text onPress={() => navigation.goBack()} style={styles.link}>
                Sign In
                </Text>

          </Text>
        </InnerContainer>
      </KeyboardAwareScrollView>
    </ForgotPasswordContainer>
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
  secondText: {
    color: "grey",
    textAlign: "center",
    marginBottom: 78,
    },
    });
    
    export default ForgotPassword;
    
    
