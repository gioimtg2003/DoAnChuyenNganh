import { Text, View ,StyleSheet} from "react-native";
import React from "react";
import { useAuth } from "../../Utils/AuthContext";

export default function MainScreen() {
    const { userEmail } = useAuth(); // Lấy thông tin người dùng từ AuthContext
    return (
        <View style={styles.container}>
            <Text>
                {userEmail}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        
    },
    
})
