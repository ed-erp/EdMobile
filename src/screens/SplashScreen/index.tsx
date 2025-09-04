import React from 'react';
 
import { View, Image } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

const SplashScreen = () => {
    return (
        <View style={[globalStyles.splashContainer]}>
            <Image 
              source={require('../../Images/Logo/one.png')}
                style={{ width: 400, height: 400, resizeMode: "contain",zIndex:100 }} 
            />
        </View>
    );
};

export default SplashScreen;
 