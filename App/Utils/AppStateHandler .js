import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { useAuth } from './AuthContext'; // Import AuthContext để truy cập userEmail
import { updateStatusOnline } from '../Services/loginService';
import { useNavigation, StackActions } from '@react-navigation/native'; // Import để sử dụng hàm chuyển trang
import { resetApp } from './ResetApp';

const AppStateHandler = () => {
  const { userEmail } = useAuth(); // Lấy thông tin userEmail từ AuthContext
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  console.log("UserEmail AppStateHandler: ", userEmail);

  const navigation = useNavigation(); // Sử dụng hook useNavigation để chuyển trang

  const [backgroundTime, setBackgroundTime] = useState(0);
  const { login } = useAuth();
  const [isInBackground, setIsInBackground] = useState(false); // Biến flag để kiểm tra xem ứng dụng có ở trạng thái background không

  const [shouldResetApp, setShouldResetApp] = useState(false); // Biến để kiểm soát việc reset app

  useEffect(() => {
    let backgroundTimer; // Biến lưu trữ timer cho thời gian ở background

    const handleAppStateChange = async (nextAppState) => {
      console.log("Trạng thái ứng dụng:", nextAppState);
      if (nextAppState === 'background') {
        if (userEmail !== null) {
          setIsInBackground(true); // Đặt biến flag thành true khi ứng dụng vào trạng thái background
          // Bắt đầu đếm thời gian ở background
          backgroundTimer = setTimeout(() => {
            setShouldResetApp(true); // Nếu quá 5 phút, set biến để reset app
          }, 30 * 1000); // 5 phút
        } else {
          return;
        }
      } else if (nextAppState === 'active') {
        setIsInBackground(false); // Đặt biến flag thành false khi ứng dụng vào trạng thái active
        // Nếu quay lại trạng thái active trong vòng 5 phút, hủy timer để ngăn reset app
        if (shouldResetApp) {
          clearTimeout(backgroundTimer);
          setShouldResetApp(false);
        }
        setBackgroundTime(0); // Đặt lại thời gian background
      }
    };

    // Thêm sự kiện lắng nghe appStateChange từ AppState của react-native
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // Hủy đăng ký sự kiện khi component unmount
      subscription.remove();
    };
  }, [userEmail, login, navigation, shouldResetApp]);

  // Kiểm tra nếu cần reset app
  useEffect(() => {
    if (shouldResetApp) {
      // Thực hiện reset app
      updateStatusOnline(userEmail, false).then(() => {
        login(null);
        resetApp(navigation);
      });
    }
  }, [shouldResetApp, userEmail, login, navigation]);

  return null;
};

export default AppStateHandler;
