import React from 'react';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { Animated } from 'react-native';

const UserInputContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #e2e2e2;
  margin-bottom: 30px;
`;

const Label = styled(Animated.Text)`
  font-size: 12px;
  margin-bottom: 6px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.TextInput`
  height: 40px;
  font-size: 14px;
  color: #333;
  padding: 0;
`;

const Icon = styled(FontAwesome)`
  position: absolute;
  left: 0;
  bottom: 8px;
`;

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const UserInput = ({
  name,
  value,
  setValue,
  autoCapitalize = 'none',
  keyboardType = 'default',
  secureTextEntry = false,
  iconName,
  isSecondIcon = false,
  iconSize = 20,
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const onFocus = () => {
    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const onBlur = () => {
    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const iconStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.8],
        }),
      },
    ],
  };

  const labelStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        }),
      },
    ],
  };
  return (
    <UserInputContainer>
      <Label style={labelStyle}>{name}</Label>
      <AnimatedIcon
        name={iconName}
        size={iconSize}
        color="#0A8791"
        style={iconStyle}
      />
      <Input
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholderTextColor="#999"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </UserInputContainer>
  );
};

export default UserInput;

