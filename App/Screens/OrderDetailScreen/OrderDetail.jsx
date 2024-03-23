import { Text, View, StyleSheet, Image, TouchableOpacity, ToastAndroid  } from "react-native";
import React, {useEffect, useState} from "react";
import { useRoute } from '@react-navigation/native';
import Color from "../../Utils/Color";
import moment from "moment";
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleUpdateStatusOrder} from '../../Services/appService';
import CancelModal from './ModalCancel';
import { ToastNotificationSuccess, ToastNotificationError } from "../../Utils/Toastnotification";
export default function OrderDetail() {
    const navigation = useNavigation();
    const [accessToken, setAccessToken] = useState('');
    const [showModal, setShowModal] = useState(false);
    const route = useRoute(); // Get route object
    const {order} = route.params;
    console.log("Detail Order", order);
   
    useEffect(() => {
        const getAccessToken = async () => {
            try {
                // Lấy Access Token từ AsyncStorage
                const AT = await AsyncStorage.getItem('jwt');
                if (AT !== null) {
                  setAccessToken(AT);
                }
              } catch (error) {
                console.log("Error:", error);
                setError("123213");
              }
        }
        getAccessToken();
    }, [])
    const handlerSuccessOrder = async (OrderId) => {
        try{
            let statusSuccessfully = 3
            let response = await handleUpdateStatusOrder(OrderId, statusSuccessfully,accessToken);
            if( response && response.data && response.data.Success === true){
                let message = 'Đã giao hàng thành công đơn hàng';
                ToastNotificationSuccess(message);
                navigation.goBack();
            } else {
                let message = 'Đơn hàng có vẫn đề. Vui lòng liên hệ hỗ trợ';
                ToastNotificationError(message);
            }
        } catch(error){
            console.log(error);
        }
    }

   
    const toggleModal = () => {
        setShowModal(!showModal);
      };
    
    const handleCancelOrder = async (orderId) => {
        if( orderId ) {
            try{
                let statusCancelOrder = 4;
                let response = await handleUpdateStatusOrder(orderId, statusCancelOrder,accessToken);
                if( response && response.data && response.data.Success === true){
                    Toast.show({
                        type: 'success',
                        text1: 'Thành công',
                        text2: 'Đơn hàng đã bị hủy'
                    });
                    navigation.goBack();
                } 
            } catch(error){
                console.log(error);
            } 
        }
        toggleModal(); // Đóng modal sau khi xử lý
    };
    return (
        <View style={[styles.container]}>
            <Text style={styles.headerText}>
                Chi tiết đơn hàng
            </Text>
            <View style={styles.OrderDetailContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: order.ProductImg }} style={styles.ImageProduct} />
                    </View>
                    <Text style={[styles.foSi, styles.customID]}>Mã đơn: {order._id}</Text>
                    <View style={[styles.line, styles.mb_8]}></View>
                    <Text style={[styles.foSi, styles.mb_8]}>Ngày tạo đơn: {moment(order.createdAt).format('DD/MM/YYYY')}</Text>
                    <Text style={[styles.foSi, styles.mb_8]}>Tên sản phẩm: {order.ProductName} </Text>
                    <Text style={[styles.foSi, styles.mb_8]}>Tên khách hàng: {order.CustomerName}</Text>
                    <Text style={[styles.foSi, styles.mb_8]}>Số điện thoại: {order.CustomerPhone}</Text>
                    <Text style={[styles.foSi, styles.mb_8]}>Địa chỉ: {order.CustomerAddress}</Text>
                    <View style={[styles.line, styles.mb_8]}></View>
                <View style={[styles.totalAmountContainer, styles.mb_8]}>
                    <Text style={[styles.totalAmount, styles.largeTotalAmount]}>Tổng giá tiền: {order.TotalAmount} VND</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.verifyButton, {backgroundColor: Color.BLUE} ]}
                        onPress={() => handlerSuccessOrder(order._id)}>
                        <Text style={styles.verifyButtonText}>Xác nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.verifyButton, {backgroundColor: Color.CANCEL}]}
                        onPress={toggleModal}>
                        <Text style={styles.verifyButtonText}>Hủy</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
            {showModal && (
                <View style={styles.modalOverlay}>
                    <CancelModal onCancel={handleCancelOrder} orderId={order._id} />
                </View>
            )}
        </View>
        
    )
}

const styles = StyleSheet.create({
    foSi: {
        fontSize: 18
    },
    mb_8: {
        marginBottom: 8
    },
    line: {
        backgroundColor: Color.BLUE,
        width: '100%',
        height: 4
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    headerText: {
        marginTop: 32,
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color:Color.BLUE 
    },
    OrderDetailContainer: {
        flexDirection: 'column',
        width: '95%',
        padding: 2
    },
    orderDetails: {
    },
    imageContainer: {
        alignItems: 'center', // Căn giữa theo chiều ngang
        marginBottom: 16
    },
    ImageProduct: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    customID: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    largeTotalAmount: {
        color: Color.BLUE_PRICE,
        fontSize: 24, // Đặt kích thước lớn hơn cho tổng giá tiền
        fontWeight: 'bold',
    },
    verifyButton: {
        padding: 10,
        borderRadius: 8,
    },
    verifyButtonText: {
        color: Color.WHITE, // Màu sắc có thể thay đổi
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 32
    },
    verifyButton: {
        padding: 10,
        borderRadius: 8,
        width: '40%', // Đặt chiều rộng của nút button để chúng nằm cạnh nhau
    },
    verifyButtonText: {
        color: Color.WHITE,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
        alignItems: 'center',
        justifyContent: 'center',
    },
})