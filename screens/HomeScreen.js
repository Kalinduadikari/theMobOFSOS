import React, { useState, useLayoutEffect, useContext, useEffect } from 'react';
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
import { AuthContext } from "../context/auth";
import axios from 'axios';
import { LogBox } from 'react-native';


  const HomeScreen = () => {

    const [products, setProducts] = useState([]);
    const [ state, setState ] = useContext(AuthContext);
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [productContainerHeight, setProductContainerHeight] = useState(0);
     LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);

   
    const searchContainerWidth = useSharedValue(100);

    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products/getAllProducts');
        const data = response.data;
        console.log('Products fetched:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    

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

    useEffect(() => {
      fetchProducts();
    }, []);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={() => navigation.openDrawer()}
          >
            <Icon name="menu" size={24} color="#0A8791" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 27 }}
            onPress={() => navigation.navigate('CartScreen')}
          >
            <Icon name="cart" size={24} color="#0A8791" />
          </TouchableOpacity>
        ),

      });
    }, [navigation]);


      const handleProductPress = (productId) => {
        // Navigate to product details screen
        navigation.navigate('ProductDetails', { productId });
      };


      const onProductContainerLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        if (height !== productContainerHeight) {
          setProductContainerHeight(height);
        }
      };
      


        const renderItem = ({ item, index }) => {
          const price = item.price ? `Rs.${item.price.toFixed(2)}` : "N/A";
          if (searchQuery && !item.name.toUpperCase().includes(searchQuery.toUpperCase())) {
            return null;
          }

          const translateY = index % 2 === 1 ? -productContainerHeight / 3 : 0;

          return (
            <View
              style={{
                flex: 1,
                margin: 20,
                paddingBottom: -195,
                paddingTop: 130,
                transform: [{ translateY }],
              }}
            >
              <TouchableOpacity
                style={styles.productContainer}
                onPress={() => handleProductPress(item._id)}
                onLayout={onProductContainerLayout}
              >
                {item.image && (
                  <Image
                    source={{ uri: item.image.url }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                )}
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={{ marginRight: 5 }}>In stock</Text>
                    <ShoppingCartIcon size={18} color="#0A8791" />
                <Text style={styles.productPrice}>{price}</Text>
                <TouchableOpacity>
                  <View style={styles.addToCartButton}>
                    
                  </View>
                </TouchableOpacity>
                <View></View>
              </TouchableOpacity>
            </View>
          );
        };
  

        const handleSearch = (text) => {
        setSearchQuery(text);
        };
        
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ebeaee", }}>
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
              <View style={styles.searchBarContainer}>
                <Animated.View
            style={[
                styles.animatedInputContainer,
                animatedSearchContainerStyle,
            ]}
            >
            <TouchableOpacity onPress={onFocus} style={styles.searchIcon}>
                <Icon name="search-outline" size={24} color="#0A8791" />
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
              <TouchableOpacity style={styles.filterIconContainer}>
               <Icon name="options-outline" size={24} color="#0A8791" />
            </TouchableOpacity>
        </View>
          
        {/* Product list */}
              <FlatList
              data={products}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderItem}
              numColumns={2}
              contentContainerStyle={{
              paddingLeft: 20, // Increase this value to add space on the left
              paddingRight: 20, // Increase this value to add space on the right
            }}
          />


       
    </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
      searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginHorizontal: 10,
        marginTop: 10,
      },
    
      searchBarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 0,
        paddingVertical: 8,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
      },
    
      filterIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginLeft: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
      },
      
        animatedInputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 15,
          borderWidth: 1,
          borderColor: '#ddd',
          backgroundColor: '#fff',
          paddingLeft: 10,
          paddingRight: 2,
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
          padding: 2,
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
          height:300,
          flex: 1,
          margin: -4,
          backgroundColor: '#ffffff',
          borderRadius: 25,
          padding: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
          marginBottom: -139,

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
          marginTop:  30,
          textAlign: 'left',
          fontWeight: 'bold',
          fontSize: 20,
        },

        addToCartButton: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
      
      });
      
      
      export default HomeScreen;
