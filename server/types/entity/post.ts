export type GetPostsRequest = {
  page: number;
  limit: number;
};

export type GetPostsResponse = {
  result: "Success" | "Failure";
  posts: Post[] | null;
  pagination: Pagination | null;
};

export type GetPostRequest = {
  id?: string | null;
};

export type GetPostResponse = {
  result: "Success" | "Failure";
  post: Post | null;
};

export type Post = {
  id: string;
  title: string;
  featureImageUrl?: string;
  html: string;
  published_at: string;
  updated_at: string;
};

export type Pagination = {
  page: number;
  limit: number;
  pages: number;
  total: number;
  next: number | null;
  prev: number | null;
};
