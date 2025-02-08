import { Dispatch, SetStateAction } from "react";

export type AdminContentParams = {
  html: string;
  title: string;
  isEdit: boolean;
  publishedAt: string | undefined;
  updatedAt: string | undefined;
  isPreview: boolean;
  setHtml: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
};
