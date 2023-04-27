import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #0E122B;
  border-radius: 50px;
  padding-horizontal: 40px;
  padding-vertical: 15px;
  margin-bottom: 20px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.23;
  shadow-radius: 2.62px;
`;

const ButtonText = styled.Text`
  font-weight: bold;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
  margin-right: 10px;
`;

const SmBtn = ({ title, handleSubmit, loading, children }) => (
  <Button onPress={handleSubmit}>
    <ButtonText>{loading ? 'Please wait...' : title}</ButtonText>
    {children}
  </Button>
);

export default SmBtn;
