import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, View, Text, StyleSheet } from "react-native";

export default function IconButton({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress: () => void;
}): JSX.Element {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.iconButton}>
        <MaterialIcons name={icon} size={38} color="#000" />
        <Text style={styles.iconButtonLabel}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconButtonLabel: {
    color: "#000",
    marginTop: 12,
  },
});
