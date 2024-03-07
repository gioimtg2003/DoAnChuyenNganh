import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading = ({ color }: { color: string }): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color={color} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderTopColor: "#3498db",
  },
});
export default Loading;
