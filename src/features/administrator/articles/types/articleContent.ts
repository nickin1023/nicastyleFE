import { AdminPost } from "@/server/types/entity/adminPost";
import { PaginationInfo } from "@/server/types/entity/post";
import { Dispatch, SetStateAction } from "react";

export type AdminContentParams = {
  html: string;
  title: string;
  featureImageUrl: string | undefined;
  publishedAt: string | undefined;
  updatedAt: string | undefined;
  isPreview: boolean;
  setHtml: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setFeatureImageUrl: Dispatch<SetStateAction<string | undefined>>;
};

export type AdminArticleDetailProps = {
  post?: AdminPost | undefined;
  isError: boolean;
};

export type AdminArticleListProps = {
  posts: AdminPost[] | null;
  pagination: PaginationInfo | null;
  isError: boolean;
};
