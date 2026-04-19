import { PostDetail } from "@/components/post-detail/PostDetail";
import { useLocalSearchParams } from "expo-router";

export default function PostScreen() {
  const { id } = useLocalSearchParams();

  return <PostDetail id={id as string} />;
}
