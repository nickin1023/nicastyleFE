export type GetAdminPostRequest = {
  id?: string | null;
};

export type GetAdminPostsResponse = {
  result: "Success" | "Failure";
  posts: AdminPost[] | null;
};

export type SetAdminPostParams = {
  id: string;
  title?: string;
  featureImageUrl?: string;
  html?: string;
  status?: string;
  updated_at: string;
};

export type SetAdminPostsResponse = {
  result: "Success" | "Failure";
};

export type AdminPost = {
  id: string;
  title: string;
  featureImageUrl?: string;
  html: string;
  status: string;
  published_at?: string;
  updated_at: string;
};
