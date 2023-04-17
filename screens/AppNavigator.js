import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="THE CATCH COLLECTION" component={HomeScreen} />
      <Drawer.Screen name="SETTINGS" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
