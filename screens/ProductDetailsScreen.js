import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  Share,
  TextInput,
  View
} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { ShoppingCartIcon, StarIcon, ShareIcon, ArrowLeftIcon } from 'react-native-heroicons/outline';
import { AuthContext } from '../context/auth';


const Container = styled.ScrollView`
  flex: 1;
  background-color: #ebeaee;
`;


const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #F3F3F3;
`;

const ProductImage = styled.Image`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 15px;
  margin-bottom: 20px;
  
`;

const RoundedContainer = styled.View`
   position: absolute;
  bottom: -322px;
  width: 100%;
  background-color: #fcfcfc;
  padding: 120px;
  border-radius: 40px;
`;

const ProductName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const ProductPrice = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #0e122b;
  position: absolute;
  bottom: 80px;
  left: 40px;
  fontFamily: 'OpenSans-Bold';
  whiteSpace: 'nowrap';
  width: 250px;
`;


const DescriptionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const DescriptionText = styled.Text`
  font-size: 16px;
  text-align: justify;
  color: #333;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const RatingText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-left: 5px;
`;

const ShareButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: 20px;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  left: 15px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 20px;
`;


const CartButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #0E122B;
  border-radius: 20px;
  padding-horizontal: 10px;
  padding-vertical: 20px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.23;
  shadow-radius: 2.62px;
  position: absolute;
  bottom: -260px;
  right: 25px;
`;


const ButtonText = styled.Text`
  font-weight: bold;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
  margin-right: 8px;
`;

const ProductNameWrapper = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px 20px;
  border-radius: 20px;
`;

const QuantityInput = styled.TextInput`
  border: 1px solid #0e122b;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  width: 30%;
`;

const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  margin-Top: 70px;

`;

const QuantityText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-right: 20px;
  marginLeft: 50px;
  marginTop: -28px;
`;

const UnitText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-left: 10px;
`;



const ProductDetailsScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [authState, , authActions] = useContext(AuthContext);
  const [quantity, setQuantity] = useState(100);



  const handleQuantityChange = (text) => {
    if (text === '') {
      setQuantity('');
    } else {
      const value = parseFloat(text);
      if (!isNaN(value)) {
        setQuantity(value);
      }
    }
  };
  
  
  const calculatePrice = () => {
    if (!product || !product.price) return 'N/A';
    const pricePer100g = product.price;
    const calculatedPrice = pricePer100g * (quantity / 100);
    return `Rs.${calculatedPrice.toFixed(2)}`;
  };
  



  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/products/${productId}`);
      const data = response.data;
      console.log('Product fetched:', data);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };


  useEffect(() => {
    fetchProduct();
    }, []);


    
    const addToCart = () => {
      console.log("addToCart called with product:", product);
      const calculatedPrice = parseFloat(calculatePrice().replace('Rs.', ''));
      authActions.addToCart(product, quantity, calculatedPrice);
    };
    
    
    
    
    const onShare = async () => {
      try {
        const result = await Share.share({
          message: `Check out this amazing product: ${product.name} - ${product.image.url}`,
        });
      } catch (error) {
        console.error('Error sharing product:', error);
      }
    };

    if (!product) {
    return (
    <LoadingContainer>
    <Text>Loading...</Text>
    </LoadingContainer>
    );
    }
    
   
    
    return (
      <Container>
        <BackButton onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={24} color="#333" />
        </BackButton>
        
        <ProductImage
          source={{ uri: product.image.url }}
          resizeMode="contain"
        />

          <QuantityContainer>
          <QuantityText>Enter Quantity:</QuantityText>
          <QuantityInput
            keyboardType="numeric"
            onChangeText={handleQuantityChange}
            value={quantity !== '' ? String(quantity) : ''}
          />
          <UnitText>g</UnitText>
        </QuantityContainer>
        
        <RoundedContainer>
          <ProductNameWrapper>
            <ProductName>{product.name}</ProductName>
          </ProductNameWrapper>
    
          <DescriptionText>{product.description}</DescriptionText>
    
          

        <ProductPrice>{calculatePrice()}</ProductPrice>
    
          <RatingContainer>
            <StarIcon size={24} color="#FFD700" />
            <RatingText>{product.rating || 'N/A'}</RatingText>
          </RatingContainer>
    
        </RoundedContainer>
    
        <CartButton onPress={addToCart}>
          <ButtonText>Cart</ButtonText>
          <ShoppingCartIcon size={24} color="#fff" />
        </CartButton>
    
        <ShareButton onPress={onShare}>
          <ShareIcon size={24} color="#0A8791" />
        </ShareButton>
      </Container>
    );
    
  };
    
    export default ProductDetailsScreen;
     

