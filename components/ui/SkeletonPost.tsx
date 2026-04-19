import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export const SkeletonPost = () => {
  return (
    <View style={styles.skeletonContainer}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <View style={styles.skeletonAvatar} />
        <View style={styles.skeletonText} />
      </View>
      <View style={styles.skeletonImage} />
      <View style={{ gap: 5, paddingHorizontal: 12 }}>
        <View style={styles.skeletonText} />
        <View style={[styles.skeletonText, { width: "100%" }]} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingHorizontal: 12,
        }}
      >
        <View style={styles.skeletonAction} />
        <View style={styles.skeletonAction} />
      </View>
    </View>
  );
};

export const SleketonPosts = () => {
  return (
    <ScrollView contentContainerStyle={{ gap: 20 }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <SkeletonPost key={i} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    gap: 20,
  },
  skeletonAvatar: {
    height: 40,
    width: 40,
    backgroundColor: "#EEEFF1CC",
    borderRadius: 40,
    marginLeft: "3%",
  },
  skeletonImage: {
    width: "100%",
    height: 300,
    backgroundColor: "#EEEFF1CC",
  },
  skeletonAction: {
    width: 64,
    height: 36,
    backgroundColor: "#EEEFF1CC",
    borderRadius: 22,
  },
  skeletonText: {
    width: 100,
    height: 20,
    backgroundColor: "#EEEFF1CC",
    borderRadius: 10,
  },
});
