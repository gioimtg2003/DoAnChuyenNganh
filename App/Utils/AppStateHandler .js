import React, { useEffect, useState, useMemo } from 'react';
import messaging from '@react-native-firebase/messaging';
import { AppState, PermissionsAndroid } from 'react-native';
import { useAuth } from './AuthContext'; // Import AuthContext để truy cập userEmail
import { updateStatusOnline } from '../Services/loginService';
import { useNavigation, StackActions } from '@react-navigation/native'; // Import để sử dụng hàm chuyển trang
import { getSocket } from './sendLocationSocket';
const AppStateHandler = () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const { login } = useAuth();
  const { userEmail, access_token } = useAuth(); // Lấy thông tin userEmail từ AuthContext
  const navigation = useNavigation(); // Sử dụng hook useNavigation để chuyển trang
  const socket = useMemo(getSocket, []);
  const [backgroundTime, setBackgroundTime] = useState(0);
  const [isInBackground, setIsInBackground] = useState(false); // Biến flag để kiểm tra xem ứng dụng có ở trạng thái background không
  const [shouldResetApp, setShouldResetApp] = useState(false); // Biến để kiểm soát việc reset app
  
  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      console.log("Trạng thái ứng dụng:", nextAppState);
      if (nextAppState === 'background') {
        if (userEmail !== null) {
          console.log("Đã cào")
          await updateStatusOnline(userEmail, false);
          setIsInBackground(true); // Đặt biến flag thành true khi ứng dụng vào trạng thái background
          useEffect( () => {
            let unsubscribe;
            socket.on("new_order", (data) => {
              console.log("connect socket AppStateHandle")
              unsubscribe  = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
                console.log('Message handled in the background!', remoteMessage);
              });
            })

            return unsubscribe;
          }, [socket])
        } 
      } else if (nextAppState === 'active') {
        await updateStatusOnline(userEmail, true);
        setIsInBackground(false); // Đặt biến flag thành false khi ứng dụng vào trạng thái active
        // Nếu quay lại trạng thái active trong vòng 5 phút, hủy timer để ngăn reset app
        // if (shouldResetApp) {
        //   clearTimeout(backgroundTimer);
        //   setShouldResetApp(false);
        // }
        setBackgroundTime(0); // Đặt lại thời gian background
      } else if (nextAppState === 'inactive') {
        // Xử lý khi ứng dụng chuyển sang trạng thái inactive (thoát hoàn toàn)
        if (userEmail !== null) {
            await updateStatusOnline(userEmail, false); // Cập nhật trạng thái online là false
            login(null, null);
        }
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
  return null;
};

export default AppStateHandler;
