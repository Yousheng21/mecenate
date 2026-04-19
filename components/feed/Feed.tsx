// screens/FeedScreen.tsx
import { feedStore } from "@/store/FeedStore";
import { observer } from "mobx-react-lite";
import React, { useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useInfiniteQuery } from "react-query";

import { EmptyPosts } from "@/components/ui/EmptyPosts";
import { SleketonPosts } from "@/components/ui/SkeletonPost";
import { getPosts } from "../../api/posts";
import { Post } from "./components/Post";
import { filters } from "./constants";

export const Feed = observer(() => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) =>
      getPosts({
        cursor: !pageParam ? undefined : pageParam,
        limit: 10,
      }),

    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) return undefined;
      return lastPage.nextCursor;
    },
  });

  const posts = useMemo(
    () => data?.pages?.flatMap((p) => p.posts) ?? [],
    [data?.pages],
  );

  useEffect(() => {
    if (posts.length) {
      feedStore.setPosts(posts);
    }
  }, [data, posts]);

  const handleRefresh = async () => {
    await refetch();
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <SleketonPosts />;
  }

  return (
    <View style={{ backgroundColor: "#F5F8FD", height: "100%" }}>
      {!isError && (
        <View style={styles.filters}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => feedStore.setFilter(filter.id)}
              style={[
                { flex: 1, paddingVertical: 14 },
                filter.id === feedStore.filter && styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: 13,
                    fontWeight: "500",
                    textAlign: "center",
                    color: "#57626F",
                  },
                  filter.id === feedStore.filter && {
                    color: "white",
                    fontWeight: "700",
                  },
                ]}
              >
                {filter.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <FlatList
        data={feedStore.filteredPosts}
        contentContainerStyle={{ gap: 20 }}
        refreshing={isFetching && !isFetchingNextPage}
        onRefresh={handleRefresh}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Post item={item} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={() =>
          !!isFetchingNextPage && <ActivityIndicator />
        }
        ListEmptyComponent={() => isError && <EmptyPosts refetch={refetch} />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    marginVertical: 16,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E8ECEF",
    marginHorizontal: 16,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  activeFilter: {
    backgroundColor: "#6115CD",
    borderRadius: 22,
  },
});
