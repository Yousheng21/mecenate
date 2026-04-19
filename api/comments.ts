import { IComment } from "@/interfaces/post.interfaces";
import client from ".";

export const getComments = async (
  id: string,
  params: {
    cursor?: string;
    simulate_error?: boolean;
    limit?: number;
  },
) => {
  const res = await client.authorizedClient({
    url: `/posts/${id}/comments`,
    params,
  });

  const data: {
    data: { comments: IComment[]; hasMore: boolean; nextCursor: string };
  } = res.data;

  return data.data;
};

export const addComment = async ({
  id,
  text,
}: {
  id: string;
  text: string;
}) => {
  const res = await client.authorizedClient({
    url: `/posts/${id}/comments`,
    method: "POST",
    data: { text },
  });
  const data = res.data;

  return data.data.comment as IComment;
};
