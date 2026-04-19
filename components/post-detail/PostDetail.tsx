import { getComments } from "@/api/comments";
import { getPostId } from "@/api/posts";
import { feedStore } from "@/store/FeedStore";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useMemo } from "react";
import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    View,
} from "react-native";
import { useInfiniteQuery, useQuery } from "react-query";
import { Post } from "../feed/components/Post";
import { EmptyPost } from "../ui/EmptyPost";
import { SkeletonPost } from "../ui/SkeletonPost";
import { Comment } from "./Comment";
import { CommentAdd } from "./CommentAdd";
import { useWs } from "./useWs";

interface IProps {
  id: string;
}

export const PostDetail: FC<IProps> = observer(({ id }) => {
  useWs(id);

  const { data, isLoading, isFetching, refetch } = useQuery("post", () =>
    getPostId(id),
  );

  const {
    data: dataComments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["comments", id],
    queryFn: ({ pageParam = 0 }) =>
      getComments(id, {
        cursor: !pageParam ? undefined : pageParam,
        limit: 10,
      }),

    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) return undefined;
      return lastPage.nextCursor;
    },
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    feedStore.setCurrentPost(data ?? null);
  }, [data]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const comments = useMemo(
    () => dataComments?.pages.flatMap((p) => p.comments) ?? [],
    [dataComments?.pages],
  );

  if (isLoading || isFetching) {
    return <SkeletonPost />;
  }

  return (
    <View style={{ flex: 1 }}>
      {feedStore.currentPost ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Comment item={item} />}
            ListHeaderComponent={
              <Post item={feedStore.currentPost} isPress={false} />
            }
            ListFooterComponent={
              <>{isFetchingNextPage && <ActivityIndicator />}</>
            }
            onEndReachedThreshold={0.4}
            keyboardShouldPersistTaps="handled"
            onEndReached={loadMore}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={80}
          >
            <CommentAdd id={id} />
          </KeyboardAvoidingView>
        </View>
      ) : (
        isError && <EmptyPost refetch={refetch} />
      )}
    </View>
  );
});
