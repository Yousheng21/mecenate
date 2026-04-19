import SvgEmpty from "@/assets/empty.svg";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const EmptyPosts = ({ refetch }: { refetch: () => void }) => {
  return (
    <View style={styles.container}>
      <SvgEmpty />
      <Text style={{ fontSize: 18, fontWeight: "700" }}>
        Не удалось загрузить публикации
      </Text>
      <TouchableOpacity onPress={refetch} style={styles.button}>
        <Text style={{ textAlign: "center", color: "white", fontSize: 15 }}>
          Повторить
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: "60%",
    gap: 16,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#6115CD",
    paddingVertical: 16,
    borderRadius: 14,
    width: "100%",
  },
});
