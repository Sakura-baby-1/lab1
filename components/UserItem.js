// UserItem.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserItem = ({ user, onEdit, onDelete, onSelect }) => {
  return (
    <View style={styles.userItem}>
      <Text style={styles.userText} onPress={() => onSelect(user)}>
        <Icon name="user" size={20} color="#FF69B4" /> {user.name} - {user.email} - {user.age} tuổi
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Chỉnh sửa" onPress={() => onEdit(user)} color="#FFA500" />
        <Button title="Xóa" onPress={() => onDelete(user.id)} color="#FF69B4" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userItem: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#FFFAF0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  userText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default UserItem;
