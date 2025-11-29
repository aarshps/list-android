import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'list_data';

export const getList = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error reading list data', e);
        return [];
    }
};

export const saveList = async (list) => {
    try {
        const jsonValue = JSON.stringify(list);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error('Error saving list data', e);
    }
};

export const addItem = async (text) => {
    const currentList = await getList();
    const newItem = {
        id: uuidv4(),
        text,
        createdAt: new Date().toISOString(),
    };
    const newList = [newItem, ...currentList];
    await saveList(newList);
    return newList;
};

export const deleteItem = async (id) => {
    const currentList = await getList();
    const newList = currentList.filter(item => item.id !== id);
    await saveList(newList);
    return newList;
};

export const importList = async (data) => {
    // Validate data structure if needed
    await saveList(data);
    return data;
};
