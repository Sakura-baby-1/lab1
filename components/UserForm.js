import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const UserForm = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateAge = (age) => {
    return Number(age) > 0;
  };

  const handleSubmit = () => {
    if (name && email && age) {
      if (!validateEmail(email)) {
        Alert.alert("Lỗi", "Email không hợp lệ. Vui lòng nhập lại.");
        return;
      }

      if (!validateAge(age)) {
        Alert.alert("Lỗi", "Tuổi không hợp lệ. Vui lòng nhập số tuổi lớn hơn 0.");
        return;
      }

      Alert.alert(
        "Xác nhận thêm",
        "Bạn có chắc chắn muốn thêm người dùng này không?",
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Thêm",
            onPress: async () => {
              const userData = { name, email, age: Number(age) };

              try {
                setLoading(true);
                await axios.post('https://lab1-e1556-default-rtdb.firebaseio.com/users.json', userData);
                Alert.alert("Thông báo", "Người dùng đã được thêm thành công!");
                onUserAdded();
                setName('');
                setEmail('');
                setAge('');
              } catch (error) {
                Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại.");
              } finally {
                setLoading(false);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Icon name="person-outline" size={20} color="#FF69B4" />
          <TextInput
            placeholder="Tên"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={20} color="#FF69B4" />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="calendar-outline" size={20} color="#FF69B4" />
          <TextInput
            placeholder="Tuổi"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#FF69B4" />
        ) : (
          <Button title="Thêm người dùng" onPress={handleSubmit} color="#FF69B4" />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFAF0',
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FF69B4',
    marginVertical: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    color: '#333',
  },
});

export default UserForm;
