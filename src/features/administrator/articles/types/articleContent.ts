import { AdminPost } from "@/server/types/entity/adminPost";
import { Pagination } from "@/server/types/entity/post";
import { Dispatch, SetStateAction } from "react";

export type AdminContentParams = {
  html: string;
  title: string;
  publishedAt: string | undefined;
  updatedAt: string | undefined;
  isPreview: boolean;
  setHtml: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
};

export type AdminArticleDetailProps = {
  post?: AdminPost | undefined;
  isError: boolean;
};

export type AdminArticleListProps = {
  initialPosts: AdminPost[] | null;
  initialPagination: Pagination | null;
  initialIsError: boolean;
};
