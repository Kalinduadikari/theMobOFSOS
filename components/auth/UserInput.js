import React from "react";
import { Text, View, TextInput} from 'react-native';

const UserInput = ({name, value, setValue, autoCapitalize = "none", keyboardType ="default", secureTextEntry =false, }) => {
    return (
            <View style={{ marginHorizontal: 24}}>
                <Text semi color="purple">{name}</Text>
                <TextInput
                autoCorrect={false}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}

                    style={{
                        borderBottomWidth:0.5,
                        height: 48,
                        borderBottomColor: "green",
                        marginBottom: 30,
                    }}
                    value={value}
                    onChangeText={(text) => setValue(text)}
                />
            </View>
    );
};

export default UserInput;
