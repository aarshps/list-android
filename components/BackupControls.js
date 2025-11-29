import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { uploadBackup, downloadBackup } from '../services/drive';
import { getList, importList } from '../services/storage';

export default function BackupControls({ accessToken, onRestoreComplete }) {
    const [loading, setLoading] = useState(false);

    const handleBackup = async () => {
        if (!accessToken) return;
        setLoading(true);
        try {
            const list = await getList();
            await uploadBackup(accessToken, list);
            Alert.alert('Success', 'Backup uploaded successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to upload backup');
        } finally {
            setLoading(false);
        }
    };

    const handleRestore = async () => {
        if (!accessToken) return;
        setLoading(true);
        try {
            const data = await downloadBackup(accessToken);
            await importList(data);
            if (onRestoreComplete) onRestoreComplete();
            Alert.alert('Success', 'Backup restored successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to restore backup');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="small" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Backup to Drive" onPress={handleBackup} disabled={!accessToken} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Restore from Drive" onPress={handleRestore} disabled={!accessToken} color="orange" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 8,
    },
});
