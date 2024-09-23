import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserDetail from './components/UserDetail';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleUserAdded = () => {
    setRefresh(prev => !prev);
  };

  const handleUserDeleted = () => {
    setRefresh(prev => !prev);
  };

  const handleUserSelected = (user) => {
    setSelectedUser(user);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản Lý Người Dùng</Text>
      {selectedUser ? (
        <UserDetail user={selectedUser} onClose={() => setSelectedUser(null)} />
      ) : (
        <FlatList
          contentContainerStyle={styles.scrollContainer}
          data={[]} // Dữ liệu sẽ được cập nhật trong UserList
          renderItem={() => null} // Không có mục nào hiển thị nếu không có dữ liệu
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            <View style={styles.footer}>
              <UserForm onUserAdded={handleUserAdded} />
              <UserList
                key={refresh}
                onUserDeleted={handleUserDeleted}
                onUserSelected={handleUserSelected}
              />
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F0F8FF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  footer: {
    paddingBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#FF69B4',
  },
});

export default App;
