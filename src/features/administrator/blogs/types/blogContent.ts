import { Dispatch, SetStateAction } from "react";

export type AdminContentParams = {
  html: string;
  title: string;
  isEdit: boolean;
  isPreview: boolean;
  setHtml: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
};
