import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { getList, addItem, deleteItem, saveList } from './services/storage';
import { useGoogleAuth } from './services/auth';
import AddItem from './components/AddItem';
import ListItem from './components/ListItem';
import GoogleAuthButton from './components/GoogleAuthButton';
import BackupControls from './components/BackupControls';

export default function App() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, userInfo, request, promptAsync } = useGoogleAuth();

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    const data = await getList();
    setList(data);
    setLoading(false);
  };

  const handleAdd = async (text) => {
    const newList = await addItem(text);
    setList(newList);
  };

  const handleDelete = async (id) => {
    const newList = await deleteItem(id);
    setList(newList);
  };

  const handleRestoreComplete = async () => {
    await loadList();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.title}>My List</Text>
        <GoogleAuthButton
          onPress={() => promptAsync()}
          userInfo={userInfo}
          disabled={!request}
        />
      </View>

      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem item={item} onDelete={handleDelete} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items yet. Add one below!</Text>
          </View>
        }
      />

      <AddItem onAdd={handleAdd} />

      {userInfo && (
        <BackupControls
          accessToken={token}
          onRestoreComplete={handleRestoreComplete}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 30, // For status bar
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
});
