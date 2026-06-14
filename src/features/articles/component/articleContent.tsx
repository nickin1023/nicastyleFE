import { HtmlContent } from "@/src/components/organisms/htmlContent/HtmlContent";
import { isoToDotDate } from "@/src/utils/dateFormatter";
import Image from "next/image";
import { ContentParams } from "../types/articleContent";

export const ArticleContent = (params: ContentParams) => {
  const { title, featureImageUrl, html, published_at, updated_at } = params;
  return (
    <>
      <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.015)] bg-neutral-100">
        <Image
          src={featureImageUrl ? featureImageUrl : "/noimage.png"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 hover:scale-101"
        />
      </div>
      <div className="bg-white border border-neutral-100/90 my-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
        <div className="p-6 md:p-10">
          <h1 className="text-2xl md:text-4xl font-extrabold text-neutral-900 leading-tight mb-6">{title}</h1>
          <div className="flex flex-wrap items-center justify-end gap-4 border-b border-neutral-100 pb-6 mb-8 text-sm text-neutral-400 font-medium">
            <time
              dateTime={published_at}
              itemProp="datePublished"
              className="flex items-center gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
                className="text-neutral-400"
              >
                {/* Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE */}
                <g fill="none">
                  <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                  <path
                    fill="currentColor"
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 6H5v10h14zM8.5 15a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2zm4 0a1 1 0 0 1 .117 1.993L12.5 17h-1a1 1 0 0 1-.117-1.993L11.5 15zm-4-4a1 1 0 0 1 .117 1.993L8.5 13h-1a1 1 0 0 1-.117-1.993L7.5 11zm4 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2zm4 0a1 1 0 0 1 .117 1.993L16.5 13h-1a1 1 0 0 1-.117-1.993L15.5 11zM19 5H5v2h14z"
                  ></path>
                </g>
              </svg>
              <span>公開: {published_at ? isoToDotDate(published_at) : "----"}</span>
            </time>
            <time
              dateTime={updated_at}
              itemProp="dateModified"
              className="flex items-center gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
                className="text-neutral-400"
              >
                {/* Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE */}
                <path
                  fill="currentColor"
                  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8"
                />
                <path
                  fill="currentColor"
                  d="M12.5 7H11v6l5.25 3.15l.75-1.23l-4.5-2.67z"
                />
              </svg>
              <span>更新: {updated_at ? isoToDotDate(updated_at) : "----"}</span>
            </time>
          </div>
          <div className="flex justify-start py-2">
            <HtmlContent html={html} />
          </div>
        </div>
      </div>
    </>
  );
};
