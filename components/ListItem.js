import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Expo includes vector icons

export default function ListItem({ item, onDelete }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{item.text}</Text>
            <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={24} color="#FF3B30" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    deleteButton: {
        padding: 8,
    },
});
