import { Text, View ,StyleSheet, TouchableOpacity} from "react-native";
import React , { useContext, useEffect}from "react";
import { useAuth } from "../../Utils/AuthContext";
import { LocationContext } from "../../Utils/LocationContext"
import { sendLocationSocket } from "../../Utils/sendLocationSocket";
export default function MainScreen() {
    const { userEmail } = useAuth(); // Lấy thông tin người dùng từ AuthContext
    const location = useContext(LocationContext);
    useEffect ( () => {
    }, [])
    const handlesend = () => {
        sendLocationSocket(location.coords.longitude, location.coords.latitude);
    }
    
    return (
        <View style={styles.container}>
            <Text>
                {userEmail}
            </Text>
            <Text>Kinh độ: {location?.coords.longitude}</Text>
            <Text>Vĩ độ: {location?.coords.latitude}</Text>
            <TouchableOpacity onPress={ handlesend}>
                <Text>Send</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
})
