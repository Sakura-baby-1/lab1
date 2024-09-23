import React, { useEffect, useState } from 'react'; 
import { View, Text, FlatList, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { ref, onValue, remove, set } from 'firebase/database';
import { database } from '../firebaseConfig';
import UserDetail from './UserDetail';
import UserItem from './UserItem';
import UserEditForm from './UserEditForm';
import UserSearch from './UserSearch'; // Import UserSearch

const UserList = ({ onUserDeleted }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = () => {
      const usersRef = ref(database, 'users');
      setLoading(true);
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        const usersList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        setUsers(usersList);
        setLoading(false);
      }, (error) => {
        setError('Không thể lấy danh sách người dùng');
        setLoading(false);
      });
    };
    fetchUsers();
  }, [onUserDeleted]);

  const handleDelete = (id) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa người dùng này không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: async () => {
            try {
              setLoading(true);
              await remove(ref(database, 'users/' + id));
              onUserDeleted();
              Alert.alert("Thông báo", "Người dùng đã được xóa thành công!");
            } catch (error) {
              Alert.alert("Lỗi", "Không thể xóa người dùng.");
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setNewName(user.name);
    setNewAge(user.age.toString());
    setNewEmail(user.email);
  };

  const handleUpdate = async () => {
    if (editingUserId && (newName || newAge || newEmail)) {
      const updatedData = {};
      if (newName) updatedData.name = newName;
      if (newAge) updatedData.age = newAge;
      if (newEmail) updatedData.email = newEmail;

      try {
        setLoading(true);
        await set(ref(database, 'users/' + editingUserId), updatedData);
        setEditingUserId(null);
        setNewName('');
        setNewAge('');
        setNewEmail('');
        Alert.alert("Thông báo", "Thông tin người dùng đã được cập nhật!");
        onUserDeleted();
      } catch (error) {
        Alert.alert("Lỗi", "Không thể cập nhật thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Thông báo", "Vui lòng nhập thông tin cần cập nhật.");
    }
  };

  const showDetails = (user) => {
    setSelectedUser(user);
  };

  const closeDetail = () => {
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(0, page * usersPerPage);

  if (loading) return <ActivityIndicator size="large" color="#FF69B4" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      {selectedUser ? (
        <View style={styles.detailContainer}>
          <UserDetail user={selectedUser} onClose={closeDetail} />
          <Button title="Quay lại danh sách" onPress={closeDetail} color="#FF69B4" />
        </View>
      ) : (
        <View>
          <Text style={styles.userCount}>
            Số lượng người dùng: {filteredUsers.length}
          </Text>
          <UserSearch 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          {editingUserId && (
            <UserEditForm 
              newName={newName}
              setNewName={setNewName}
              newEmail={newEmail}
              setNewEmail={setNewEmail}
              newAge={newAge}
              setNewAge={setNewAge}
              handleUpdate={handleUpdate}
            />
          )}
          
          <FlatList
            data={paginatedUsers}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({ item }) => (
              <UserItem 
                user={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSelect={showDetails}
              />
            )}
            onEndReached={() => {
              if (paginatedUsers.length < filteredUsers.length) {
                setPage(prevPage => prevPage + 1);
              }
            }}
            onEndReachedThreshold={0.1}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  detailContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  userCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF69B4',
    textAlign: 'center',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
});

export default UserList;
