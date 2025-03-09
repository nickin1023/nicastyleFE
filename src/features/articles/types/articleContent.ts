import { Post } from "@/server/types/entity/post";

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
