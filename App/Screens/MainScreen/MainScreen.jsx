import React , { useContext, useEffect, useMemo, useState}from "react";
import { 
  Text, 
  View ,
  StyleSheet, 
  TouchableOpacity , 
  ScrollView, 
  Image, 
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "../../Utils/AuthContext";
import { LocationContext } from "../../Utils/LocationContext"
import { getSocket, sendLocationSocket } from "../../Utils/sendLocationSocket";
import { getOrderWithStatus } from "../../Services/appService";
import Color from "../../Utils/Color";
import { ToastNotificationSuccess } from "../../Utils/Toastnotification";

export default function MainScreen() {      
  const navigation = useNavigation();
    const { userEmail } = useAuth(); // Lấy thông tin người dùng từ AuthContext
    const {access_token} = useAuth();
    const [accessToken, setAccessToken] = useState(null);
    const location = useContext(LocationContext);
    const socket = useMemo(getSocket, []);
    const [error, setError] = useState('');
    const [messageNewOrder, setMessage] = useState('');
    const [listOrder, setListOrder] = useState([]);
    useEffect(() => {
      socket.on("connect", () => {
        console.log("connect socket");
        socket.emit("coordinates", (location));
        socket.emit("shipper", (userEmail));
        socket.emit("required_token", access_token);       
      })
      socket.on("new_order", (data) => {
        console.log("Dữ liệu ở phòng ShopId trên webSocket khi tạo đơn hàng mới: ", data.message);
        ToastNotificationSuccess( data.message)
        fetchDataAndToken();
      })
      socket.emit("join");
      setTimeout(() => {
        socket.emit("notifi-new-order")
      }, 3000)
      socket.on("disconnect", () => {
        console.log(socket.id); // undefined
      });
      return () => {
        socket.off("new_order");
      };
    }, [socket])

    
    useEffect(() => {
      fetchDataAndToken();
    }, []);

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        // Call your function to refresh data here
        fetchDataAndToken();
      });
  
      return unsubscribe;
    }, [navigation]);

    const fetchDataAndToken = async () => {
      try {
        // Lấy Access Token từ AsyncStorage
        const AT = await AsyncStorage.getItem('jwt');
        if (AT !== null) {
          setAccessToken(AT);
        }
        const response = await getOrderWithStatus(AT, 1);
        if (response && response.data && response.data.Success === true) {
          setListOrder(response.data.Orders);
        }
      } catch (error) {
        console.log("Error:", error);
        setError("123213");
      }
    };
    const goToOrderDetailScreen = (order) => {
      navigation.navigate('OrderDetail', { order });
    }
    if( messageNewOrder !== null ){
      useEffect(() => {
        fetchDataAndToken();
        setMessage('');
      }, [])
    }

    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text>
            {userEmail}
        </Text>
      </View>
      <Text style={styles.textHeader}>
        Danh sách đơn hàng
      </Text>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          {listOrder.map((order, index) => (
            <TouchableOpacity  key={index} style={styles.orderItem} onPress={() => goToOrderDetailScreen(order) } >
              <View style={styles.orderDetailsContainer}>
                  <Image source={{ uri: order.ProductImg }} style={styles.orderItemImage} />
                  <View style={styles.orderDetails}>
                      <Text style={styles.ft_16}>Mã đơn: {order._id}</Text>
                      <Text style={styles.ft_16}>Ngày tạo đơn: {moment(order.createdAt).format('DD/MM/YYYY')}</Text>
                      <Text style={styles.ft_16}>Khách hàng: {order.CustomerName} </Text>
                  </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    backgroundColor: Color.BLUE,
    width: '100%',
    height: 100,
  },
  textHeader: {
    marginTop: 16,
    fontSize: 32
  },
  scrollView: {
    width: '100%',
    marginTop: 12
  },
  scrollViewContent: {
    alignItems: 'center', // Canh giữa theo chiều ngang
  },
  orderItem: {
    width: '95%',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Color.BLUE,
    borderRadius: 5,
  },
  orderDetailsContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  orderDetails: {
    marginLeft: 10,
  },
  ft_16: {
    fontSize: 16
  },
  orderItemImage: {
    width: 75,
    height: 75,
    resizeMode: 'cover',
    borderRadius: 5,
  },
})