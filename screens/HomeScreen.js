import React, { useState, useLayoutEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { ShoppingCartIcon } from 'react-native-heroicons/outline';

const products = [
    { id: 1, name: 'PARAW', image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/330026--01--1615287995.webp', price: 'Rs 299.00' },
    { id: 2, name: 'PRAWNS', image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/330031--01--1549601979.webp', price: 'Rs 299.00'  },
    { id: 3, name: 'TUNA', image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/330049--01--1630600321.webp', price: 'Rs 299.00'  },
    { id: 4, name: 'HENDELLA', image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/330015--01--1630854399.webp', price: 'Rs 299.00'  },
    { id: 5, name: 'LINNA', image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/330021--1--1560487777.webp', price: 'Rs 299.00'  },
    { id: 6, name: 'SUDAYA', image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/330042--01--1630854399.webp', price: 'Rs 299.00'  },
    { id: 7, name: 'THALAPATH', image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/330045--1--1560487777.webp' , price: 'Rs 299.00' },
    { id: 8, name: 'WHITE MULLETE', image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/330053--01--1630854399.webp' , price: 'Rs 299.00' },
    { id: 9, name: 'Product 9', image: 'https://via.placeholder.com/150', price: 'Rs 299.00'  },
    { id: 10, name: 'Product 10', image: 'https://via.placeholder.com/150', price: 'Rs 299.00' },
    { id: 11, name: 'Product 11', image: 'https://via.placeholder.com/150', price: 'Rs 299.00'  },
    { id: 12, name: 'Product 12', image: 'https://via.placeholder.com/150', price: 'Rs 299.00' },
    { id: 13, name: 'Product 13', image: 'https://via.placeholder.com/150', price: 'Rs 299.00' },
    { id: 14, name: 'Product 14', image: 'https://via.placeholder.com/150', price: 'Rs 299.00' },
    { id: 15, name: 'Product 15', image: 'https://via.placeholder.com/150', price: 'Rs 299.00'  },
    { id: 16, name: 'Product 16', image: 'https://via.placeholder.com/150', price: 'Rs 299.00' },
    { id: 17, name: 'Product 17', image: 'https://via.placeholder.com/150', price: 'Rs 299.00'  },
    { id: 18, name: 'Product 18', image: 'https://via.placeholder.com/150', price: 'Rs 299.00' },
    { id: 19, name: 'Product 19', image: 'https://via.placeholder.com/150', price: 'Rs 299.00' },
    { id: 20, name: 'Product 20', image: 'https://via.placeholder.com/150', price: 'Rs 299.00' },
  ];



  const HomeScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
   
    const searchContainerWidth = useSharedValue(100);

    const animatedSearchContainerStyle = useAnimatedStyle(() => {
      return {
        width: withTiming(searchContainerWidth.value, {
          duration: 300,
        }),
      };
    });
  
    const onFocus = () => {
      searchContainerWidth.value = 350;
    };
  
    const onBlur = () => {
      searchContainerWidth.value = 100;
    };

    useLayoutEffect(() => {
        navigation.setOptions({
           headerShown: true,
           headerRight: () => (
             <TouchableOpacity style={{ marginRight: 18 }}>
               <Icon name="cart-outline" size={24} color="#027bff" />
             </TouchableOpacity>
           ),
        });
      }, []);

      const handleProductPress = (productId) => {
        // Navigate to product details screen
        navigation.navigate('ProductDetails', { productId });
      };

      const renderItem = ({ item }) => {
        // Render the product only if it matches the search query
        const parsedPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        const price = parsedPrice ? `LKR ${parsedPrice.toFixed(2)}` : "N/A";
        if (searchQuery && !item.name.toUpperCase().includes(searchQuery.toUpperCase())) {
        return null;
            }
            return (
                <TouchableOpacity
                style={styles.productContainer}
                onPress={() => handleProductPress(item.id)}
                >
                <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                />
                <Text style={styles.productName}>
                    {item.name}
                </Text>

                <Text style={styles.productPrice}>
                        {price}
                    </Text>

              <TouchableOpacity>
              <View style={styles.addToCartButton}>
                <Text style={{ marginRight: 5 }}>In stock</Text>
                <ShoppingCartIcon size={18} />
              </View>
              </TouchableOpacity>
              
            </TouchableOpacity>
            
          );
            
        };

        const handleSearch = (text) => {
        setSearchQuery(text);
        };
        
        return (
            <SafeAreaView style={{ flex: 1 }}>
            {/* Header */}
            <View
            style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            }}
            >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
            style={{
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0, 0, 0, 0.2)',
            marginTop: 5,
            width: '100%',
            }}
            />
            </View>
         
      </View>

            {/* Search and Adjustment icon */}
            <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
            <Animated.View
            style={[
                styles.animatedInputContainer,
                animatedSearchContainerStyle,
            ]}
            >
            <TouchableOpacity onPress={onFocus} style={styles.searchIcon}>
                <Icon name="search-outline" size={24} color="#027bff" />
            </TouchableOpacity>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for products"
                placeholderTextColor="#999"
                onChangeText={handleSearch}
                value={searchQuery}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            </Animated.View>
        </View>
        <TouchableOpacity style={styles.adjustmentIcon}>
        <Icon name="options-outline" size={24} color="#027bff" />
         </TouchableOpacity>
        </View>
          
    {/* Product list */}
    <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        
    />
       
    </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
        searchContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingHorizontal: 8,
          paddingVertical: 8,
          marginHorizontal: 10,
          borderRadius: 30,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 4,
        },
      
        animatedInputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 25,
          borderWidth: 1,
          borderColor: '#ddd',
          backgroundColor: '#fff',
          paddingLeft: 10,
          paddingRight: 5,
          width: '100%',
        },
      
        searchBox: {
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        },
      
        searchInput: {
          fontSize: 16,
          flex: 1,
          padding: 8,
          borderRadius: 25,
          backgroundColor: 'transparent',
          fontFamily: 'Arial',
        },
        searchIcon: {
          padding: 5,
        },
      
        adjustmentIcon: {
          padding: 5,
          position: 'absolute',
          right: 10,
        },

        productContainer: {
          flex: 0.5,
          margin: 10,
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
        },

        productImage: {
          width: '100%',
          aspectRatio: 1,
          borderRadius: 10,
          marginBottom: 10,
        },

        productName: {
          marginBottom: 5,
          textAlign: 'center',
          fontWeight: 'bold',
        },

        productPrice: {
          marginBottom: 10,
          textAlign: 'center',
          fontWeight: 'bold',
        },

        addToCartButton: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
      
      });
      
      
      export default HomeScreen;
