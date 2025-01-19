import { HtmlContent } from "@/src/components/organisms/htmlContent/HtmlContent";
import { ContentParams } from "../types/blogContent";

export const BlogContent = (params: ContentParams) => {
  return <HtmlContent html={params.html} />;
};
