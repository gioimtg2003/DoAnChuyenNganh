// Trong tệp ResetApp.js
import { StackActions } from '@react-navigation/native';

export const resetApp = (navigation) => {
  // Sử dụng navigation để đưa ứng dụng về trạng thái ban đầu
  // Ví dụ: Chuyển đến màn hình đăng nhập hoặc màn hình chính
  const resetAction = StackActions.replace('Login');
  navigation.dispatch(resetAction);
};
