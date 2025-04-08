import { HtmlContent } from "@/src/components/organisms/htmlContent/HtmlContent";
import { isoToDotDate } from "@/src/utils/dateFormatter";
import Image from "next/image";
import { ContentParams } from "../types/articleContent";

export const ArticleContent = (params: ContentParams) => {
  const { title, featureImageUrl, html, published_at, updated_at } = params;
  return (
    <>
      <p>title: {title}</p>
      <p className="flex justify-end">
        <time dateTime={published_at} itemProp="datePublished">
          公開日: {published_at ? isoToDotDate(published_at) : "----"}
        </time>
        &ensp;
        <time dateTime={updated_at} itemProp="dateModified">
          最終更新日: {updated_at ? isoToDotDate(updated_at) : "----"}
        </time>
      </p>
      <div className="relative aspect-[16/9]">
        <Image
          src={featureImageUrl ? featureImageUrl : "/noimage.png"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <HtmlContent html={html} />
    </>
  );
};
