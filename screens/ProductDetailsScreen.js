import React, { useState, useEffect } from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Share
} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { ShoppingCartIcon, StarIcon, ShareIcon } from 'react-native-heroicons/outline';
import SmBtn from '../components/auth/SmBtn';

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
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

const ProductName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 5px;
`;

const ProductPrice = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #0A8791;
  text-align: center;
  margin-bottom: 20px;
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
  margin-bottom: 20px;
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

const ProductDetailsScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

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
    // Handle adding the product to the cart
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

  const price = product.price ? `LKR${product.price.toFixed(2)}` : 'N/A';

  return (
    <Container>
      <ProductImage
        source={{ uri: product.image.url }}
        resizeMode="contain"
      />
      <ProductName>{product.name}</ProductName>
        <ProductPrice>{price}</ProductPrice>
        <RatingContainer>
        <StarIcon size={24} color="#FFD700" />
        <RatingText>{product.rating || 'N/A'}</RatingText>
        </RatingContainer>
        <SmBtn title="Add to Cart" handleSubmit={addToCart}>
        <ShoppingCartIcon size={24} color="#fff" />
        </SmBtn>
        <ShareButton onPress={onShare}>
        <ShareIcon size={24} color="#0A8791" />
        </ShareButton>
        <DescriptionTitle>Description</DescriptionTitle>
        <DescriptionText>{product.description}</DescriptionText>
        </Container>
        );
        };

        export default ProductDetailsScreen;
