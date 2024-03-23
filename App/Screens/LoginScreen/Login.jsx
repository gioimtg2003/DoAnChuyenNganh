import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
    Dimensions, 
    TouchableOpacity, 
    TextInput, 
    KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from "expo-web-browser";
import Color from '../../Utils/Color';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { isValidCheckEmail} from '../../Utils/Validation';
import { handleLoginApp } from '../../Services/loginService';
import { useAuth } from '../../Utils/AuthContext';
WebBrowser.maybeCompleteAuthSession();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Login() {
    useWarmUpBrowser();
    const {login} = useAuth();
    const [email, onChangeEmial] = React.useState('');
    const [errorEmail, setErrorEmail] = React.useState('');
    const navigation = useNavigation(); // Get navigation object
    const handleLogin = async () => {
        let respone = await handleLoginApp(email);
        if( respone.data.Success === true) {
            login(email, respone.data.AT);
            navigation.navigate('OTPInput', {OTP: respone.data.OTP , Email: email, AT: respone.data.AT}); 
            // setErrorEmail(respone.data.OTP)
        } else {
            setErrorEmail(respone.data.Mess);
        }
    }
    return (
        <View style={styles.container}>
            <Image
                style={styles.img_login}
                source={require('../../../assets/images/LogoLogin.png')}
                resizeMode="contain"
            />
            <View style={styles.subcontainer}>
                <Text style={styles.header_text}>
                    Login
                </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeEmial}
                        value={email}

                        placeholder="Email"
                    />
                <Text style={{color: 'red'}}>{errorEmail}</Text>
                <TouchableOpacity
                    onPress={() => {
                        let validateEmail = isValidCheckEmail(email);
                        validateEmail.ER === true ?  handleLogin(email) : setErrorEmail(validateEmail.Mess); 
                    }}
                    style={styles.btnLogin}
                    title="Login in"> 
                    <Text style={{color: Color.WHITE}}> Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    subcontainer: {
        width: '100%', // Điều chỉnh chiều rộng của subcontainer
        alignItems: 'center', // Canh chỉnh các phần tử bên trong theo chiều ngang
    },
    header_text: {
        fontSize: 44,
        color:Color.BLUE
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
    btnLogin: {
        width: '60%',
        alignItems: 'center',
        backgroundColor: Color.BLUE,
        padding: 10,
        borderRadius: 8,
        marginTop:20,

    },
    img_login: {
        width: windowWidth,
        height: windowHeight / 2, // Chiếm một nửa chiều cao của màn hình
    }
})
