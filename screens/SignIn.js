import React, { useState} from "react";
import { Text, View, ScrollView } from 'react-native';
import UserInput from "../components/auth/UserInput";
import SmBtn from "../components/auth/SmBtn";
import axios from "axios";
import RoundLogo from "../components/auth/RoundLogo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ceil } from "react-native-reanimated";
import Signup from "./Signup";




const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    const hSubmit = async () => {
      setLoading(true);
      if (!email || !password) {
        alert('All fields are required');
        setLoading(false);
        return;
      }
      console.log("SIGNIN REQUEST =>", email, password);
  
      try {
        const { data } = await axios.post('http://localhost:8080/signin', {
          email,
          password,
        });
        setLoading(false);
        console.log("SIGN IN SUCCESS = >", data);
        alert('Sign In Successful')
      } catch (err) {
        console.log(err)
        setLoading(false);
      }
    }

    return (
    <KeyboardAwareScrollView contentContainerStyle={{
      flex: 1,
      justifyContent: "center",
    }}>

      <View style={{
        marginVertical: 100,
      }}>
        <RoundLogo />

        <Text style={{
          fontSize: 30,
          color: "blue",
          textAlign: "center",
        }}>Sign In</Text>

        <UserInput
          name="EMAIL"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />

        <SmBtn title="Sign In" hSubmit={hSubmit} loading={loading} />



        <Text style={{ textAlign: "center" }}>Not yet registered? <Text onPress={() => navigation.navigate('Signup')} style={{ color: "red", }}>Sign Up</Text></Text>

        <Text style={{ color: "blue", textAlign: "center" }}>
        Forgot Password?
        </Text>

        </View>

        </KeyboardAwareScrollView>
        );
        };

export default SignIn;
