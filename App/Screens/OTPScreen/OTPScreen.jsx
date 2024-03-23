import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '../../Utils/Color'; // Đảm bảo điều chỉnh đường dẫn đến tệp màu sắc của bạn
import { isValidCheckOTP } from '../../Utils/Validation';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { updateStatusOnline } from '../../Services/loginService';  
export default function OTPInput() {
    const route = useRoute(); // Get route object
    const navigation = useNavigation(); // Get navigation object

    const { OTP, Email, AT} = route.params; // Nhận dữ liệu email từ route.params
    const [otp, setOTP] = useState('');
    const [errorOTP, setErrorOTP] = useState(Email);

    const handleVerifyOTP = async () => {
        try {
            if(otp == OTP){
                await updateStatusOnline(Email, true);
                await AsyncStorage.setItem('jwt', AT);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
    
            } else {
                setErrorOTP("OTP không đúng");
            }
        } catch (error) {
            console.log(error);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
        
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Nhập mã OTP</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setOTP(text)}
                value={otp}
                keyboardType="numeric"
                maxLength={6} // Giả sử mã OTP có 6 ký tự
                placeholder="Nhập mã OTP"
            />
            <Text style={{color: 'red' , marginBottom: 8}}>{OTP}</Text>
            <TouchableOpacity style={styles.verifyButton} 
                onPress={() => {
                    let validateOTP = isValidCheckOTP(otp);
                    validateOTP.ER === true ?  handleVerifyOTP() : setErrorOTP(validateOTP.Mess); 
                }}
            >
                <Text style={styles.verifyButtonText}>Xác minh OTP</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: Color.BLUE, // Màu sắc có thể thay đổi
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 8

    },
    verifyButton: {
        backgroundColor: Color.BLUE, // Màu sắc có thể thay đổi
        padding: 10,
        borderRadius: 8,
    },
    verifyButtonText: {
        color: Color.WHITE, // Màu sắc có thể thay đổi
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
