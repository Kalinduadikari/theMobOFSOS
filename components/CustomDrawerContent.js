import React, { useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';

const CustomDrawerContent = (props) => {
  const { imageUrl } = props;
  const [state, setState] = useContext(AuthContext);

  const signOut = async () => {
    setState({ token: '', user: null });
    await AsyncStorage.removeItem('@auth');
  };

  const placeholderUrl = 'https://via.placeholder.com/100';
  
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={{
            uri: imageUrl ? imageUrl : placeholderUrl,
          }}
          style={styles.logo}
        />
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Custom Item"
        onPress={() => {
          // Perform any action on press
        }}
      />
      <DrawerItem label="Logout" onPress={signOut} />
    </DrawerContentScrollView>
  );
};


const styles = StyleSheet.create({
  drawerHeader: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A8791',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default CustomDrawerContent;
