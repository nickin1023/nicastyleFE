export type GetAdminPostRequest = {
  id?: string | null;
};

export type GetAdminPostsResponse = {
  result: "Success" | "Failure";
  posts: AdminPost[] | null;
};

export type AdminPost = {
  id: string;
  title: string;
  featureImageUrl?: string;
  html: string;
  status: string;
};
