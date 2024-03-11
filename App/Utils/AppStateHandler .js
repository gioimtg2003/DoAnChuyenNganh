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

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      console.log("Trạng thái ứng dụng:", nextAppState);
      if (nextAppState === 'background') {
        if( userEmail !== null){
          setIsInBackground(true); // Đặt biến flag thành true khi ứng dụng vào trạng thái background
          // Đếm thời gian ứng dụng ở trạng thái background
          const intervalId = setInterval(() => {
            setBackgroundTime(prevTime => prevTime + 1);
          }, 1000);

          // Sau 5 phút, thực hiện cập nhật trạng thái online trên server và chuyển đến trang đăng nhập
          setTimeout(async () => {
            clearInterval(intervalId);
            // Kiểm tra xem ứng dụng có ở trạng thái background không trước khi thực hiện các bước trong background
              await updateStatusOnline(userEmail, false); 
              login(null);
              resetApp(navigation);
          }, 30 * 1000);
        }
      } else if (nextAppState === 'active') {
        setIsInBackground(false); // Đặt biến flag thành false khi ứng dụng vào trạng thái active
        clearInterval(null);
        setBackgroundTime(0);
      }
    };

    // Thêm sự kiện lắng nghe appStateChange từ AppState của react-native
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // Hủy đăng ký sự kiện khi component unmount
      subscription.remove();
    };
  }, [userEmail, login, navigation, isInBackground]);

  return null;
};

export default AppStateHandler;
