import { likePost } from "@/api/posts";
import SvgComment from "@/assets/comment.svg";
import { LikeButton } from "@/components/ui/LikeButton";
import { IPost } from "@/interfaces/post.interfaces";
import { feedStore } from "@/store/FeedStore";
import { Image } from "expo-image";
import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMutation } from "react-query";
import { PostPaid } from "./PostPaid";

interface IProps {
  item: IPost;
  isPress?: boolean;
}

export const Post = observer(({ item, isPress = true }: IProps) => {
  const likeMutation = useMutation({
    mutationFn: likePost,

    onMutate: async (postId: string) => {
      feedStore.toggleLikeLocal(postId);
    },

    onError: (err, postId) => {
      feedStore.toggleLikeLocal(postId);
    },
  });

  if (item.tier === "paid") {
    return <PostPaid {...item} />;
  }

  return (
    <TouchableOpacity
      onPress={() => router.push(`/post/${item.id}`)}
      disabled={!isPress}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={item.author.avatarUrl}
          style={{ borderRadius: 40, width: 40, height: 40 }}
          contentFit="cover"
          placeholder="|rF?hV%2WCj[ayj[ayj[ayj["
          transition={300}
        />
        <Text style={{ fontSize: 15, fontWeight: "700" }}>
          {item.author.displayName}
        </Text>
      </View>

      <Image
        source={item.coverUrl}
        style={{ width: "100%", height: 300 }}
        placeholder="|rF?hV%2WCj[ayj[ayj[ayj["
        contentFit="cover"
        transition={300}
      />

      <View style={styles.textBlock}>
        <Text style={{ fontWeight: "700", fontSize: 18 }}>{item.title}</Text>
        <Text style={{ fontSize: 15 }}>{item.preview}</Text>
      </View>
      <View style={styles.actionWrapper}>
        <LikeButton item={item} onLike={() => likeMutation.mutate(item.id)} />
        <TouchableOpacity onPress={() => ""} style={styles.actionBlock}>
          <SvgComment />
          <Text>{item.commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

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
  img: {
    width: "100%",
    height: 300,
  },
  textBlock: {
    paddingHorizontal: 12,
    gap: 15,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  actionWrapper: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 12,
  },
  actionBlock: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: "#DDDDDD",
    borderRadius: 15,
    padding: 7,
  },
  skeleton: {
    width: "100%",
    height: 300,
    backgroundColor: "#EEEFF1CC",
  },
});
