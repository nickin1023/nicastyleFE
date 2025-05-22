import { Pagination } from "@/src/components/organisms/pagination/Pagination";
import { InternalServerError } from "@/src/components/templates/internalServerError";
import { isoToDotDate } from "@/src/utils/dateFormatter";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { ArticleListProps } from "../types/articleContent";

export const ArticleList = ({
  posts,
  pagination,
  isError
}: ArticleListProps) => {
  const onClick = (pageIndex: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: pageIndex }
    });
  };

  if (isError) return <InternalServerError />;

  return (
    <div className="relative">
      <h1 className="text-3xl font-bold text-center pt-8 pb-4">記事一覧</h1>
      {posts && posts.length ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-5 px-4">
            {posts.map((post, index) => (
              <Link
                className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                key={index}
                href={`/articles/${post.id}`}
                passHref
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={
                      post.featureImageUrl
                        ? post.featureImageUrl
                        : "/noimage.png"
                    }
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="py-2 px-4">
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <p className="flex items-center gap-1 text-[15px] text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.25em"
                      height="1.25em"
                      viewBox="0 0 24 24"
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
                    <span>{isoToDotDate(post.published_at)}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {pagination && (
            <div className="py-4">
              <Pagination
                variant={"primary"}
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onClick={onClick}
              />
            </div>
          )}
        </>
      ) : (
        <p>記事はありません。</p>
      )}
    </div>
  );
};
