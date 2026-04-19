import { IComment, IPost } from "@/interfaces/post.interfaces";
import { makeAutoObservable } from "mobx";

export type TFilter = "all" | "free" | "paid";

class FeedStore {
  posts: IPost[] = [];
  currentPost: IPost | null = null;
  selectedPostId: number | null = null;
  filter: TFilter = "all";
  hasMore: boolean = true;
  comments: IComment[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setPosts(posts: IPost[]) {
    this.posts = posts;
  }

  setCurrentPost(post: IPost | null) {
    this.currentPost = post;
  }

  toggleLikeLocal(postId: string) {
    if (postId === this.currentPost?.id) {
      this.currentPost = {
        ...this.currentPost,
        isLiked: !this.currentPost.isLiked,
        likesCount: this.currentPost.isLiked
          ? this.currentPost.likesCount - 1
          : this.currentPost.likesCount + 1,
      };
    }
    this.posts = [...this.posts].map((i) => {
      if (i.id === postId) {
        return {
          ...i,
          isLiked: !i.isLiked,
          likesCount: i.isLiked ? i.likesCount - 1 : i.likesCount + 1,
        };
      }
      return i;
    });
  }

  updateLikes(postId: string, likesCount: number) {
    if (postId === this.currentPost?.id) {
      this.currentPost.likesCount = likesCount;
    }

    this.posts = [...this.posts].map((i) => {
      if (i.id === postId) {
        return {
          ...i,
          likesCount,
        };
      }
      return i;
    });
  }

  addLocalComment(postId: string) {
    this.currentPost = {
      ...this.currentPost,
      commentsCount: (this.currentPost?.commentsCount ?? 0) + 1,
    } as IPost;

    this.posts = [...this.posts].map((i) => {
      if (i.id === postId) {
        return {
          ...i,
          commentsCount: i.commentsCount + 1,
        };
      }
      return i;
    });
  }

  removeLocalComment(postId: string) {
    this.currentPost = {
      ...this.currentPost,
      commentsCount: (this.currentPost?.commentsCount ?? 0) - 1,
    } as IPost;

    this.posts = [...this.posts].map((i) => {
      if (i.id === postId) {
        return {
          ...i,
          commentsCount: i.commentsCount - 1,
        };
      }
      return i;
    });
  }

  setFilter(filter: TFilter) {
    this.filter = filter;
  }

  get filteredPosts() {
    if (this.filter === "free") {
      return this.posts.filter((p) => p.tier === "free");
    } else if (this.filter === "paid") {
      return this.posts.filter((p) => p.tier === "paid");
    }
    return this.posts;
  }
}

export const feedStore = new FeedStore();
