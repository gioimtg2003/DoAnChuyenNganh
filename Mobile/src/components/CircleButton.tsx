import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

export default function CircleButton({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.circleBUtton} onPress={onPress}>
        <MaterialIcons name="add" size={38} color="#25292e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 84,
    height: 84,
    borderRadius: 42,
    marginHorizontal: 60,
    padding: 3,
    borderWidth: 4,
    borderColor: "#FFC374",
  },
  circleBUtton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
  },
});
