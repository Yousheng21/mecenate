import { IPost } from "@/interfaces/post.interfaces";
import client from ".";

export const getPosts = async (params?: {
  cursor?: string;
  simulate_error?: boolean;
  limit?: number;
}) => {
  const res = await client.authorizedClient({ url: "/posts", params: params });
  const data: {
    data: { posts: IPost[]; hasMore: boolean; nextCursor: string };
  } = res.data;

  return data.data ?? { posts: [], hasMore: false };
};

export const getPostId = async (id: string) => {
  const res = await client.authorizedClient({ url: `/posts/${id}` });

  const data: {
    data: { post: IPost };
  } = res.data;

  return data.data.post ?? null;
};

export const likePost = async (postId: string) => {
  const res = await client.authorizedClient({
    url: `/posts/${postId}/like`,
    method: "POST",
  });
  const data = res.data;

  return data.data;
};
