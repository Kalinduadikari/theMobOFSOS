import React from 'react';
import { Text, View, TextInput, TouchableOpacity} from 'react-native';

const SmBtn = ({ title, hSubmit, loading }) => (
    <TouchableOpacity
    onPress={hSubmit}
        style={{
        backgroundColor: "#ff9900",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: 10,
        borderRadius: 24,
        }}
        >
        <Text style={{
            fontWeight:"bold",
            textAlign: "center",
            fontSize: 16,
        }}>
           {loading ? 'Please wait...' : title}
        </Text>
        </TouchableOpacity>
);
    
        
export default SmBtn;


