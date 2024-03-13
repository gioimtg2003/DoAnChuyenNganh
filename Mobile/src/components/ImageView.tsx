import { useMemo } from "react";
import { StyleSheet, Image } from "react-native";
import React from "react";

export default function ImageViewer({
  placeholderImageSource,
  selectedImage,
}: {
  placeholderImageSource: any;
  selectedImage?: string;
}) {
  const imageSource = useMemo(
    () => (selectedImage ? { uri: selectedImage } : placeholderImageSource),
    [selectedImage]
  );
  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
