import { PaginationInfo } from "./post";

export type GetAdminPostsRequest = {
  page: number;
  limit: number;
};

export type GetAdminPostsResponse = {
  result: "Success" | "Failure";
  posts: AdminPost[] | null;
  pagination: PaginationInfo | null;
};

export type GetAdminPostRequest = {
  id?: string | null;
};

export type GetAdminPostResponse = {
  result: "Success" | "Failure";
  post: AdminPost | null;
};

export type AddAdminPostParams = {
  title?: string;
  featureImageUrl?: string;
  html?: string;
};

export type SetAdminPostParams = {
  id: string;
  title?: string;
  featureImageUrl?: string;
  html?: string;
  status?: string;
  updated_at: string;
};

export type MutateAdminPostsResponse = {
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
