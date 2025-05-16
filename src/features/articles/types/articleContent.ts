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
  posts: Post[] | null;
  pagination: PaginationInfo | null;
  isError: boolean;
};

export type ArticleCarouselProps = {
  posts: Post[] | null;
  isError: boolean;
};
