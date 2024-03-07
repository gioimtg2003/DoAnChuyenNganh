import { MaterialIcons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, View } from "react-native";

export default function EmojiPicker({
  isVisible,
  children,
  onClose,
}: {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}): JSX.Element {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={{ fontWeight: "500" }}>Emoji Picker</Text>
          <MaterialIcons name="close" size={24} onPress={onClose} />
        </View>
        <View style={styles.containerEmoji}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "25%",
    backgroundColor: "#E3E1D9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: "16%",
    backgroundColor: "#B4B4B8",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  containerEmoji: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});
