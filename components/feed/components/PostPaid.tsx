import SvgMoney from "@/assets/money.svg";
import { IPost } from "@/interfaces/post.interfaces";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const PostPaid = (item: IPost) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={item.author.avatarUrl}
          style={{ borderRadius: 40, width: 40, height: 40 }}
          contentFit="cover"
          transition={300}
        />
        <Text style={{ fontSize: 15, fontWeight: "700" }}>
          {item.author.displayName}
        </Text>
      </View>

      <View style={styles.imgWrapper}>
        <Image
          source={item.coverUrl}
          style={{ width: "100%", height: "100%" }}
          placeholder="|rF?hV%2WCj[ayj[ayj[ayj["
          contentFit="cover"
          transition={300}
          blurRadius={120}
        />

        <View style={styles.overlay}>
          <SvgMoney />
          <Text style={styles.text}>
            Контент скрыт пользователем. Доступ откроется после доната
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={{ textAlign: "center", color: "white", fontSize: 15 }}>
              Отправить донат
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ gap: 5, paddingHorizontal: 12 }}>
        <View style={styles.skeletonText} />
        <View style={[styles.skeletonText, { width: "100%", height: 40 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: "white",
    paddingVertical: 12,
  },
  header: {
    flexDirection: "row",
    gap: 15,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignItems: "center",
  },
  imgWrapper: {
    width: "100%",
    height: 300,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "20%",
    gap: 15,
  },
  text: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6115CD",
    paddingVertical: 8,
    borderRadius: 14,
    width: 230,
  },
  skeletonText: {
    width: 100,
    height: 26,
    backgroundColor: "#EEEFF1CC",
    borderRadius: 10,
  },
});
