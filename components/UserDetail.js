// components/UserDetail.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserDetail = ({ user, onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết người dùng</Text>
      <View style={styles.infoContainer}>
        <Icon name="user" size={20} color="#FF69B4" />
        <Text style={styles.label}>Tên:</Text>
        <Text style={styles.info}>{user.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon name="envelope" size={20} color="#FF69B4" />
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon name="calendar" size={20} color="#FF69B4" />
        <Text style={styles.label}>Tuổi:</Text>
        <Text style={styles.info}>{user.age} tuổi</Text>
      </View>
      <Button title="Đóng" onPress={onClose} color="#FF69B4" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 5, // Tạo hiệu ứng bóng
    width: '90%', // Đảm bảo kích thước phù hợp
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF69B4', // Màu tiêu đề
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFAF0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10, // Khoảng cách giữa biểu tượng và nhãn
  },
  info: {
    fontSize: 18,
    color: '#555',
    marginLeft: 10, // Khoảng cách giữa nhãn và thông tin
  },
});

export default UserDetail;
