export type GetPostRequest = {
  id?: string | null;
};

export type GetPostsResponse = {
  result: "Success" | "Failure";
  posts: Post[] | null;
};

export type Post = {
  id: string;
  title: string;
  featureImageUrl?: string;
  html: string;
  published_at: string;
  updated_at: string;
};
