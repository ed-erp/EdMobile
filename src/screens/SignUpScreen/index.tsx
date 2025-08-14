import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SignUpScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Sign Up</Text>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
