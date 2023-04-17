import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={{
            uri: 'https://via.placeholder.com/100',
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
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#027bff',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default CustomDrawerContent;
