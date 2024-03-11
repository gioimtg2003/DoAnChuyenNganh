import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { useAuth } from './AuthContext'; // Import AuthContext để truy cập userEmail
import { updateStatusOnline } from '../Services/loginService';

const AppStateHandler = () => {
  const { userEmail } = useAuth(); // Lấy thông tin userEmail từ AuthContext

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        // Thực hiện cập nhật trạng thái online trên server
        await updateStatusOnline(userEmail, false);
      }
    };

    
  }, [userEmail]);

  return null;
};

export default AppStateHandler;
