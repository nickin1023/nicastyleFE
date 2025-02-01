import { Dispatch, SetStateAction } from "react";

export type AdminContentParams = {
  html: string;
  isEdit: boolean;
  isPreview: boolean;
  setHtml: Dispatch<SetStateAction<string>>;
};
