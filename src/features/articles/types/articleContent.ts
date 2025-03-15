import { PaginationInfo, Post } from "@/server/types/entity/post";

export type ContentParams = {
  title: string;
  featureImageUrl?: string;
  html: string;
  published_at?: string;
  updated_at?: string;
};

export type ArticleDetailProps = {
  post?: Post | undefined;
  isError: boolean;
};

export type ArticleListProps = {
  initialPosts: Post[] | null;
  initialPagination: PaginationInfo | null;
  initialIsError: boolean;
};
