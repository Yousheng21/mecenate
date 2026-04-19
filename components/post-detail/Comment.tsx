import { IComment } from "@/interfaces/post.interfaces";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import SvgHeart from "@/assets/heart.svg";

export const Comment = ({ item }: { item: IComment }) => {
  return (
    <View style={styles.commentWrapper}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          source={item.author.avatarUrl}
          style={{ borderRadius: 40, width: 40, height: 40 }}
          contentFit="cover"
          transition={300}
        />
        <View style={{ gap: 2 }}>
          <Text>{item.author.displayName}</Text>
          <Text>{item.text}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.like}>
        <SvgHeart width={15} height={15} />
        <Text>2</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  commentWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  like: {
    gap: 3,
    flexDirection: "row",
    alignItems: "center",
  },
});
