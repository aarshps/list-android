import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

export default function GoogleAuthButton({ onPress, userInfo, disabled }) {
    if (userInfo) {
        return (
            <View style={styles.userInfoContainer}>
                <Image source={{ uri: userInfo.picture }} style={styles.avatar} />
                <Text style={styles.welcomeText}>Hi, {userInfo.given_name}</Text>
            </View>
        );
    }

    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4285F4',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        elevation: 2,
    },
    disabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    welcomeText: {
        fontSize: 16,
        fontWeight: '500',
    },
});
