import {StyleSheet} from 'react-native';
import Color from '../../Utils/Color';

export default loginStyles = StyleSheet.create({
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
        width: '100%', // Chiều rộng của TextInput sẽ đầy đủ bằng chiều rộng của subcontainer
        height: 40,
        marginVertical: 12, // Thay vì margin, sử dụng marginVertical để margin top và bottom
        borderWidth: 1,
        padding: 10,
        borderRadius: 8
    },
    
    // img_login: {
    //     width: windowWidth,
    //     height: windowHeight / 2, // Chiếm một nửa chiều cao của màn hình
    // }
})