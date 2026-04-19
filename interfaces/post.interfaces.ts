export interface IPost {
  id: string;
  author: IAuthor;
  title: string;
  body: string;
  preview: string;
  coverUrl: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  tier: "free" | "paid";
  createdAt: string;
}

export interface IAuthor {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  subscribersCount: number;
  isVerified: boolean;
}

export interface IComment {
  author: IAuthor;
  id: string;
  text: string;
  createdAt: string;
  postId: string;
}
