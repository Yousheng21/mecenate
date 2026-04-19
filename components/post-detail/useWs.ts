import { connectWS, getWS, subscribeWS } from "@/api/ws";
import { feedStore } from "@/store/FeedStore";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

export const useWs = (id: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    connectWS();

    subscribeWS({
      onLike: ({ postId, likesCount }) => {
        feedStore.updateLikes(postId, likesCount);
      },

      onComment: (comment) => {
        // если это текущий пост
        if (comment.postId === id) {
          feedStore.addLocalComment(id);
        }
        queryClient.invalidateQueries({
          queryKey: ["comments", comment.postId],
        });
      },
    });

    return () => {
      const ws = getWS();
      if (ws) {
        ws.onmessage = null; // 👈 важно очистить
      }
    };
  }, [id, queryClient]);
};
