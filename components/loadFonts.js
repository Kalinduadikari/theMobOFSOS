import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

const LoadFonts = (props) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Roboto-Bold': Asset.fromModule(require('../assets/fonts/Roboto-Bold.ttf')).uri, 
      'Roboto-Regular': Asset.fromModule(require('../assets/fonts/Roboto-Regular.ttf')).uri,
      'OpenSans-Bold': Asset.fromModule(require('../assets/fonts/OpenSans-Bold.ttf')).uri,
      'OpenSans-Regular': Asset.fromModule(require('../assets/fonts/OpenSans-Regular.ttf')).uri,
      'SF-Pro': Asset.fromModule(require('../assets/fonts/SF-Pro.ttf')).uri,
      'SF-Pro-Display-Medium': Asset.fromModule(require('../assets/fonts/SF-Pro-Display-Medium.otf')).uri,
      'SF-Pro-Display-Bold': Asset.fromModule(require('../assets/fonts/SF-Pro-Display-Bold.otf')).uri,

    });
    setFontLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <>
      {props.children}
    </>
  );
};

export default LoadFonts;
