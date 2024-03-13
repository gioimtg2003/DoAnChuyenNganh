import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const KeyBoard = ({
  onPress,
  onClear,
}: {
  onPress: (key: string) => void;
  onClear: () => void;
}): JSX.Element => {
  return (
    <View style={styles.containerCol}>
      <View style={styles.containerRow}>
        <View style={styles.containerKey}>
          <Pressable style={styles.keyCap} onPress={() => onPress("7")}>
            <Text style={styles.keys}>7</Text>
          </Pressable>
        </View>
        <View style={styles.containerKey}>
          <Pressable style={styles.keyCap} onPress={() => onPress("8")}>
            <Text style={styles.keys}>8</Text>
          </Pressable>
        </View>
        <View style={styles.containerKey}>
          <Pressable style={styles.keyCap} onPress={() => onPress("9")}>
            <Text style={styles.keys}>9</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.containerRow}>
        <View style={styles.containerKey}>
          <Pressable style={styles.keyCap} onPress={() => onPress("4")}>
            <Text style={styles.keys}>4</Text>
          </Pressable>
        </View>
        <View style={styles.containerKey}>
          <Pressable style={styles.keyCap} onPress={() => onPress("5")}>
            <Text style={styles.keys}>5</Text>
          </Pressable>
        </View>
        <View style={styles.containerKey}>
          <Pressable style={styles.keyCap} onPress={() => onPress("6")}>
            <Text style={styles.keys}>6</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.containerRow}>
        <View style={styles.containerKey}>
          <Pressable style={styles.keyCap} onPress={() => onPress("1")}>
            <Text style={styles.keys}>1</Text>
          </Pressable>
        </View>
        <View style={styles.containerKey}>
          <Pressable style={styles.keyCap} onPress={() => onPress("2")}>
            <Text style={styles.keys}>2</Text>
          </Pressable>
        </View>
        <View style={styles.containerKey}>
          <Pressable style={styles.keyCap} onPress={() => onPress("3")}>
            <Text style={styles.keys}>3</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.containerRow}>
        <View style={styles.containerKey}>
          <Pressable style={styles.keyCap}>
            <Text style={styles.keys}></Text>
          </Pressable>
        </View>
        <View style={styles.containerKey}>
          <Pressable style={styles.keyCap} onPress={() => onPress("0")}>
            <Text style={styles.keys}>0</Text>
          </Pressable>
        </View>
        <View style={styles.containerKey}>
          <Pressable style={styles.keyCap} onPress={() => onClear()}>
            <MaterialIcons name="delete" size={30} color="#213759" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  keyCap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "#f0f5fc",
    elevation: 2,
    shadowColor: "black",
  },
  containerKey: {
    width: "33.33%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f5fc",
  },
  keys: {
    fontSize: 25,
    fontWeight: "600",
    color: "#213759",
  },
  containerCol: {
    width: "100%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  containerRow: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default KeyBoard;
