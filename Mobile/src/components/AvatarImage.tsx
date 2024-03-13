import React from "react";
import { Image, View } from "react-native";
const avatar = require("../../assets/avatar.png");
export default function AvatarImage(): JSX.Element {
  return (
    <View
      style={{
        width: 80,
        height: 80,
        borderRadius: 80,
        padding: 10,
      }}
    >
      <Image
        source={avatar}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </View>
  );
}
