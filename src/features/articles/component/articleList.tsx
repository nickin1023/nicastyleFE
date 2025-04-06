import { Pagination } from "@/src/components/organisms/pagination/Pagination";
import { InternalServerError } from "@/src/components/templates/internalServerError";
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
      <h1>ブログ一覧</h1>
      {posts && posts.length ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-5">
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
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                </div>
              </Link>
            ))}
          </div>
          {pagination && (
            <Pagination
              variant={"primary"}
              currentPage={pagination.page}
              totalPages={pagination.pages}
              onClick={onClick}
            />
          )}
        </>
      ) : (
        <p>記事はありません。</p>
      )}
    </div>
  );
};
