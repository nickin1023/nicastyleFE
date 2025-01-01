export type GetPostRequest = {
  id?: number | null;
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
};
