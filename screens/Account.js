import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import UserInput from "../components/auth/UserInput";
import SmBtn from "../components/auth/SmBtn";
import axios from "axios";
import RoundLogo from "../components/auth/RoundLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


const Account = ({ navigation }) => {
  const [name, setName] = useState('Loading...');
  const [email, setEmail] = useState("Loading...");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //image
  const [uploadImage, setUploadImage] = useState("");
  const [image, setImage] = useState({url: '', public_id: ""});

  //context
  const [state, setState] = useContext(AuthContext);

 
  useEffect(() => {
    if (state && state.user) {
      const { name, email, image } = state.user;
      setName(name);
      setEmail(email);
      setImage(image);
    }
  }, [state]);
  

  const handleSubmit = async () => {
    setLoading(true);
    //api request
    try {
      const {data} = await axios.post("/users/update-password", {password});
      if(data.error){
        alert(data.error);
        setLoading(false);
      }else {
        alert("Your password has been updated successfully 👍");
        setPassword("");
        setLoading(false);
      }
    } catch (err) {
      if (err.response && err.response.status === 503) {
        alert("The server is currently unavailable. Please try again later.");
      } else {
        alert("Password Updation failed. Try again");
      }
      console.log(err);
      setLoading(false);
    }
  };
  

  const handleUpload = async () => {
    let permissionResults = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //
    if(permissionResults.granted === false){
      alert('Camera access is required');
      return;
    }
    // get image from image library
    let imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    //console.log("PICTURE RESULT =>", imageResult);
    if(imageResult.cancelled === true){
      return;
    }
    //save to state for preview
    let base64Image = `data:image/jpg;base64,${imageResult.base64}`; 
    setUploadImage(base64Image);

    //send to backend for uploading to cloudinary
    const { data } = await axios.post(
      "/users/upload-image",
      {
        image: base64Image,
      },
      
    );
    console.log("UPLOADED RESPONSE => ", data);
    //update async storage
    const as = JSON.parse(await AsyncStorage.getItem("@auth"));
    as.user = data;
    await AsyncStorage.setItem('@auth', JSON.stringify(as));

    //context updation
    setState({...state, user: data});
    setImage(data.image);
    alert("👍 PROFILE IMAGE SAVED");

  };
  
 


  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
    >
      <View style={styles.innerContainer}>
        <RoundLogo>
         {image && image.url ? (
          <Image 
          source={{uri: image.url}}
          style={{
              width: 190,
              height: 190,
              borderRadius: 100,
              marginVertical: 50,
          }}
          />
         ) : uploadImage ? <Image 
          source={{uri: uploadImage}}
          style={{
              width: 190,
              height: 190,
              borderRadius: 100,
              marginVertical: 50,
          }}
          />: (
          <TouchableOpacity onPress={() => handleUpload()}>
            <FontAwesome name="camera" size={25} color="#0A8791"></FontAwesome>
          </TouchableOpacity>
         )}
        </RoundLogo>

        {image && image.url ? (
          <TouchableOpacity onPress={() => handleUpload()}>
            <FontAwesome name="camera" size={25} color="#0A8791" style={{
              marginTop: -5,
              marginBottom: 10,
              alignSelf: "center",
            }}></FontAwesome>
          </TouchableOpacity>
        ) : (
          <></>
          )}

        <Text style={styles.title}>{name}</Text>
        <Text style={styles.mediumTxt}>{email}</Text>


        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />

        <SmBtn title="Update Password" handleSubmit={handleSubmit} loading={loading} />

      
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ebeaee",
    paddingBottom: 150,
  },
  innerContainer: {
    marginVertical: 100,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    color: "#0A1F44",
    textAlign: "center",
    marginBottom: 8,
  },
  mediumTxt: {
    fontSize: 15,
    textAlign: "center",
    paddingBottom: 50,
  },

  text: {
    textAlign: "center",
    marginTop: 10,
  },
  link: {
    color: "#E93C58",
  },
  linkText: {
    color: "#0A1F44",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Account;
