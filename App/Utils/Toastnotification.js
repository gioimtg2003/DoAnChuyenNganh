import Toast from 'react-native-toast-message';


export const ToastNotificationSuccess = (message) => {
    Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: message
    });
}

export const ToastNotificationError = (message) => {
    Toast.show({
        type: 'error',
        text1: 'Thất bại',
        text2: message
    });
}