import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { PRIMARY_COLOR } from "../lib/Constant";

const FloatActionButton = ({
  focused,
  size,
}: {
  focused: boolean;
  size: number;
}) => {
  return (
    <View style={styles.button}>
      <AntDesign name="dropbox" size={size + 7} color={"#fff"} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3498db",
    position: "absolute",
    bottom: 20,

    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "black",
  },
});

export default FloatActionButton;
