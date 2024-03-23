import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Color from '../../Utils/Color';

const CancelModal = ({ onCancel, orderId }) => {
  return (
    <View style={styles.modalContent}>
      <Text style={styles.modalText}>Xác nhận hủy đơn hàng</Text>
      <TouchableOpacity onPress={() => onCancel(orderId)} style={styles.modalButton}>
        <Text style={styles.modalButtonText}>Xác nhận</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancel} style={[styles.modalButton, {backgroundColor: '#727272'}]}>
        <Text style={styles.modalButtonText}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: Color.WHITE,
    borderRadius: 10,
    padding: 20,
    position: 'absolute', // Đặt vị trí tuyệt đối
    zIndex: 1, // Đảm bảo modal hiển thị phía trên mọi thành phần khác
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: Color.BLUE,
    width: '100%',
    marginTop: 10,
  },
  modalButtonText: {
    color: Color.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CancelModal;
