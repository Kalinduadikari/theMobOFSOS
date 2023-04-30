import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../config";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: "",
    cart: [],
    userId: "",
  });
  

  // navigation
  const navigation = useNavigation();

  // config axios
  const token = state && state.token ? state.token : "";
  axios.defaults.baseURL = API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // handle expired token or 401 error
  axios.interceptors.response.use(
    async function (response) {
      return response;
    },
    async function (error) {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        await AsyncStorage.removeItem("@auth");
        setState({ user: null, token: "" });
        navigation.navigate("Signin");
      }
    }
  );

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let cartData = await AsyncStorage.getItem("@cart");

      if (data) {
        const as = JSON.parse(data);
        setState({ ...state, user: as.user, token: as.token, userId: as.user._id });
        console.log("Data found in AsyncStorage: ", as);
      } else {
        console.log("No data found in AsyncStorage.");
      }
      

      if (cartData) {
        setState((prevState) => ({ ...prevState, cart: JSON.parse(cartData) }));
      }
    };

    loadFromAsyncStorage();
  }, []);

  
  const fetchCartItems = async (onFetched) => {
    try {
      const response = await axios.get(`/cart/getCartByUserId/${state.user._id}`);
      console.log(response);
  
      if (response.data && response.data.items) {
        setState((prevState) => ({ ...prevState, cart: response.data.items }));
        if (onFetched) onFetched();
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  
  
  
  
  const addToCart = async (product, quantity, price) => {
    const data = {
      userId: state.user._id,
      productId: product._id,
      quantity: quantity,
      imageUrl: product.image.url,
      price: price,
      name: product.name,
    };

    try {
      await axios.post("/cart/add", data);
      console.log("Data has sent", data);
      await fetchCartItems();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  
  
  const removeItemFromCart = async (productId) => {
    try {
      const userId = state.user._id;
      const data = { userId, productId };
      await axios.post("/cart/remove", data);
      await fetchCartItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  

  

  const clearCart = async () => {
    try {
      const userId = state.user._id;
      await axios.post("/cart/clear", { userId });
      setState((prevState) => ({
        ...prevState,
        cart: [],
      }));
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  
  const createOrder = async (userId, totalAmount) => {
    try {
      const items = state.cart.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
        name: item.name,
      }));
  
      const orderData = {
        userId,
        items,
        amount: totalAmount,
      };
  
      const response = await axios.post(`/orders/create`, orderData);
  
      if (response && response.status === 201) {
        console.log('Order created successfully');
      } else {
        console.error('Error creating order:', response);
      }
    } catch (error) {
      console.error('Error creating order:', error.message || error);
    }
  };
  
  
  
  
  

  return (
    <AuthContext.Provider
      value={[
        state,
        setState,
        { addToCart, removeItemFromCart, clearCart, fetchCartItems, createOrder },
      ]}
    >
      {children}
    </AuthContext.Provider>
  );



};

export { AuthContext, AuthProvider };
