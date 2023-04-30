import React, { useContext } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Animated } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';





const CustomDrawerContent = (props) => {
  const { imageUrl, name, userEmail, navigation } = props;
  const [state, setState] = useContext(AuthContext);

  const signOut = async () => {
    setState({ token: '', user: null });
    await AsyncStorage.removeItem('@auth');
  };

  const placeholderUrl = 'https://via.placeholder.com/100';
  const drawerHeaderBackground = 'https://yourBackgroundImageUrl.com';

  const CustomDrawerItem = ({ label, iconName, onPress, iconFamily = 'Ionicons' }) => (
    <TouchableOpacity onPress={onPress} style={styles.drawerItem}>
      {iconFamily === 'Ionicons' && <Icon name={iconName} size={24} color="#FFF" />}
      {iconFamily === 'MaterialCommunityIcons' && (
        <MaterialCommunityIcons name={iconName} size={24} color="#FFF" solid={false} />
      )}
      <Text style={styles.drawerItemLabel}>{label}</Text>
    </TouchableOpacity>
  );
  
  return (
    <LinearGradient
      colors={['#0A8791', '#0E122B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <DrawerContentScrollView {...props} contentContainerStyle={styles.contentContainer}>
        <Image
          source={{ uri: drawerHeaderBackground }}
          style={styles.drawerHeaderBackground}
        />
        <View style={styles.drawerHeader}>
          <Image
            source={{
              uri: imageUrl ? imageUrl : placeholderUrl,
            }}
            style={styles.logo}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.userEmail}>{userEmail || 'user@example.com'}</Text>
          </View>
        </View>
        <View style={styles.drawerItemsContainer}>
          <CustomDrawerItem
            label="Catch Collection"
            iconName="storefront-outline"
            onPress={() => navigation.navigate('HomeScreen')}
            iconFamily="MaterialCommunityIcons"
          />
          <View style={styles.separator} />
          <CustomDrawerItem
            label="Account"
            iconName="person-outline"
            onPress={() => navigation.navigate('Account')}
          />
         
          <View style={styles.separator} />
          <CustomDrawerItem
            label="Logout"
            iconName="log-out-outline"
            onPress={signOut}
          />
        </View>
      </DrawerContentScrollView>
</LinearGradient>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
},
contentContainer: {
flexGrow: 1,
},
drawerHeaderBackground: {
position: 'absolute',
width: '100%',
height: 200,
resizeMode: 'cover',
},
drawerHeader: {
height: 200,
flexDirection: 'column',
alignItems: 'center',
justifyContent: 'center',
borderBottomWidth: 1,
borderBottomColor: 'rgba(255, 255, 255, 0.2)',
paddingBottom: 20,
},
logo: {
width: 100,
height: 100,
borderRadius: 50,
marginBottom: 10,
borderWidth: 2,
borderColor: '#FFF',
shadowColor: '#000',
shadowOffset: {
width: 0,
height: 3,
},
shadowOpacity: 0.3,
shadowRadius: 4.65,
elevation: 8,
},
userInfo: {
alignItems: 'center',
},
name: {
fontSize: 20,
color: '#FFF',
fontWeight: 'bold',
letterSpacing: 1,
fontFamily: 'Roboto-Regular', // Add your preferred font-family
},
userEmail: {
fontSize: 14,
color: '#FFF',
letterSpacing: 0.5,
fontFamily: 'Roboto-Regular', // Add your preferred font-family
},
drawerItemsContainer: {
marginTop: 20,
},
drawerItem: {
flexDirection: 'row',
alignItems: 'center',
borderRadius: 10,
marginVertical: 5,
paddingHorizontal: 20,
paddingVertical: 15,
backgroundColor: 'rgba(255, 255, 255, 0)',
shadowColor: '#000',
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
},
drawerItemLabel: {
fontSize: 16,
fontWeight: '600',
color: '#FFF',
marginLeft: 20,
letterSpacing: 0.5,
fontFamily: 'Roboto-Regular', // Add your preferred font-family
},
separator: {
height: 1,
backgroundColor: 'rgba(255, 255, 255, 0.2)',
marginVertical: 5,
},
});

export default CustomDrawerContent;
