import { HtmlContent } from "@/src/components/organisms/htmlContent/HtmlContent";
import { isoToDotDate } from "@/src/utils/dateFormatter";
import { ContentParams } from "../types/blogContent";

export const BlogContent = (params: ContentParams) => {
  const { title, featureImageUrl, html, published_at, updated_at } = params;
  return (
    <>
      <p>title: {title}</p>
      <p className="flex justify-end">
        <time dateTime={published_at} itemProp="datePublished">
          公開日: {isoToDotDate(published_at)}
        </time>
        &ensp;
        <time dateTime={updated_at} itemProp="dateModified">
          最終更新日: {isoToDotDate(updated_at)}
        </time>
      </p>
      <HtmlContent html={html} />
    </>
  );
};
