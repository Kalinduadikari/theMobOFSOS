import React, { useState} from "react";
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import UserInput from "../components/auth/UserInput";
import SmBtn from "../components/auth/SmBtn";
import axios from "axios";
import RoundLogo from "../components/auth/RoundLogo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';




const Signup = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const hSubmit = async () => {
      setLoading(true);
      console.log("START SIGNUP");
      if (!name || !email || !password) {
        alert("All fileds are required");
        setLoading(false);
        return;
      }
    
      try {
        const { data } = await axios.post("http://localhost:8000/api/signup", {
          name,
          email,
          password,
        });
        console.log("SIGNUP RESPONSE", data);
        setLoading(false);
        alert("Sign Up Successful");
      } catch (err) {
        console.log("SIGNUP ERROR", err);
        setLoading(false);
      }
    };
    
      return (
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              marginVertical: 100,
            }}
          >
            <RoundLogo />
    
            <Text
              style={{
                fontSize: 30,
                color: "blue",
                textAlign: "center",
              }}
            >
              Sign Up
            </Text>
    
            <UserInput
              name="NAME"
              value={name}
              setValue={setName}
              autoCapitalize="words"
              autoCorrect={false}
            />
    
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
    
            <SmBtn title="Sign Up" hSubmit={hSubmit} loading={loading} />


            <Text style={{ textAlign: "center" }}>
          Already Joined?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={{ color: "red" }}>Sign In</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
