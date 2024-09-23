// UserEditForm.js
import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const UserEditForm = ({ newName, setNewName, newEmail, setNewEmail, newAge, setNewAge, handleUpdate }) => {
  return (
    <View style={styles.editContainer}>
      <View style={styles.inputContainer}>
        <Icon name="person-outline" size={20} color="#FF69B4" />
        <TextInput 
          placeholder="Tên mới"
          value={newName}
          onChangeText={setNewName}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#FF69B4" />
        <TextInput 
          placeholder="Email mới"
          value={newEmail}
          onChangeText={setNewEmail}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="calendar-outline" size={20} color="#FF69B4" />
        <TextInput 
          placeholder="Tuổi mới"
          value={newAge}
          onChangeText={setNewAge}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cập nhật" onPress={handleUpdate} color="#FF69B4" />
        <Icon name="checkmark-circle-outline" size={30} color="#FF69B4" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editContainer: {
    padding: 15,
    backgroundColor: '#FFFAFA',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF69B4',
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginLeft: 10,
  },
});

export default UserEditForm;
