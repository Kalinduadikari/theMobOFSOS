import React from 'react';
import { View, Image} from 'react-native';

const RoundLogo = ({children}) => (
<View
    style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 20,
    }}
    >
    <View style={{
        backgroundColor: "white",
        height: 190,
        width: 190,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    }}>
    {children ? ( 
     children
    ) : (
    <Image 
    source={require("../../assets/appstore.png")}
    style={{
        width: 150,
        height: 160,
        marginVertical: 50,
    }}
     />
     )}
    </View>
</View>

);


export default RoundLogo;  