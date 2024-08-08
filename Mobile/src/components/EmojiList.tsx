import React, { useMemo } from "react";
import { FlatList, Image, Pressable, StyleSheet } from "react-native";

export default function EmojiList({
    onSlected,
    onClose,
}: {
    onSlected: (emoji: string) => void;
    onClose: () => void;
}): JSX.Element {
    const emojiList = useMemo(() => {
        const emoji: any[] = [];
        emoji.push(require("../assets/assets/images/emoji1.png"));
        emoji.push(require("../assets/assets/images/emoji2.png"));
        emoji.push(require("../assets/assets/images/emoji3.png"));
        emoji.push(require("../assets/assets/images/emoji4.png"));
        emoji.push(require("../assets/assets/images/emoji5.png"));
        emoji.push(require("../assets/assets/images/emoji6.png"));
        return emoji;
    }, []);

    return (
        <FlatList
            horizontal
            data={emojiList}
            contentContainerStyle={styles.containerList}
            renderItem={({ item, index }) => (
                <Pressable
                    onPress={() => {
                        onSlected(item);
                        onClose();
                    }}
                >
                    <Image
                        source={item}
                        style={{ width: 100, height: 100, marginRight: 20 }}
                    />
                </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
    containerList: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});
