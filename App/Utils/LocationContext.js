import React, { createContext, useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { sendLocationSocket } from './sendLocationSocket';
export const LocationContext = createContext();
import { useAuth } from './AuthContext'; 
export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const subscriptionRef = useRef(null)
  const { userEmail } = useAuth(); // Lấy thông tin người dùng từ AuthContext

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied')
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };

    const startWatchingLocation = async () => {
      await getLocation();
      // Thêm event listener để cập nhật vị trí khi có sự thay đổi
      const subscription = await Location.watchPositionAsync(
        (position) => {
          setLocation(position);
        }
      );
      subscriptionRef.current = subscription;
    };

    startWatchingLocation();
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove(); // Kiểm tra và gọi remove() nếu có
      }
    }; // Xóa event listener khi unmount
  }, []);

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};
