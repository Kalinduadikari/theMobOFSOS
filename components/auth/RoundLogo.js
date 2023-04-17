import React from 'react';
import { View, Image} from 'react-native';

const RoundLogo = () => (
<View
    style={{
        justifyContent: "center",
        alignItems: "center",
    }}
    >
    <Image 
    source={require("../../assets/appstore.png")}
    style={{
        width: 150,
        height: 160,
        marginVertical: 50,
    }}
     />
</View>

);


export default RoundLogo;  