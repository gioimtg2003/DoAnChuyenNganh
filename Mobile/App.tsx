import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Button from "./src/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useRef, useState } from "react";
import ImageViewer from "./src/components/ImageView";
import CircleButton from "./src/components/CircleButton";
import IconButton from "./src/components/IconButton";
import EmojiPicker from "./src/components/EmojiPicker";
import EmojiList from "./src/components/EmojiList";
import EmojiSticker from "./src/components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import IntroScreen from "./src/screens/intro.screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/introLogin.screen";
import StackNavigator from "./src/navigations/StackNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickEmoji, setPickEmoji] = useState<any>(null);
  const [status, requestsPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef(null);
  if (status === null) {
    requestsPermission();
  }
  const handleModal = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const pickImageAsync = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.2,
    });
    if (!result.canceled) {
      setSelectedImage(result["assets"][0]["uri"]);
      setShowAppOptions(true);
    } else {
      alert("You cancelled the image picker.");
    }
  }, []);

  const onSaveImageAsync = useCallback(async () => {
    try {
      const localUri = await captureRef(imageRef, {
        width: 440,
        quality: 0.9,
      });
      await MediaLibrary.saveToLibraryAsync(localUri);

      if (localUri) {
        alert("Image saved successfully");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <NavigationContainer independent={true}>
      <StackNavigator />
    </NavigationContainer>
    // <IntroScreen />
  );
  // <GestureHandlerRootView style={styles.container}>
  //   <View style={styles.image}>
  //     <View ref={imageRef} collapsable={true}>
  //       <ImageViewer
  //         placeholderImageSource={image}
  //         selectedImage={selectedImage}
  //       />
  //     </View>
  //     {pickEmoji && <EmojiSticker source={pickEmoji} imageSize={40} />}
  //   </View>
  //   {showAppOptions ? (r
  //     <View className="absolute bottom-[80]">
  //       <View style={styles.optionsRow}>
  //         <IconButton icon="refresh" label="Edit" onPress={() => {}} />
  //         <CircleButton onPress={handleModal} />
  //         <IconButton
  //           icon="save-alt"
  //           label="Edit"
  //           onPress={onSaveImageAsync}
  //         />
  //       </View>
  //     </View>
  //   ) : (
  //     <View style={styles.footerContainer}>
  //       <Button
  //         label="Choose a photo"
  //         theme="primary"
  //         onPress={pickImageAsync}
  //       />
  //       <Button
  //         label="Use this photo"
  //         onPress={() => {
  //           setShowAppOptions(true);
  //         }}
  //       />
  //     </View>
  //   )}
  //   <EmojiPicker isVisible={isModalVisible} onClose={handleModal}>
  //     <EmojiList onSlected={setPickEmoji} onClose={handleModal} />
  //   </EmojiPicker>
  //   <StatusBar style="auto" />
  // </GestureHandlerRootView>
}
const styles = StyleSheet.create({
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  image: {
    flex: 1,
    paddingTop: 58,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
