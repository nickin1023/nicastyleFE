import { Button } from "@/src/components/atoms/button/Button";
import { Pagination } from "@/src/components/organisms/pagination/Pagination";
import { InternalServerError } from "@/src/components/templates/internalServerError";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { AdminArticleListProps } from "../types/articleContent";

export const AdminArticleList = ({
  posts,
  pagination,
  isError
}: AdminArticleListProps) => {
  const onClick = (pageIndex: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: pageIndex }
    });
  };

  if (isError) return <InternalServerError />;

  return (
    <div className="relative">
      <h1 className="text-3xl font-bold text-center pt-8 pb-4">ブログ一覧</h1>
      <Button
        variant="primary"
        onClick={() => {
          router.push(`/administrator/articles/createPost`);
        }}
      >
        新規作成
      </Button>
      {posts && posts.length ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-5">
            {posts.map((post, index) => (
              <Link
                className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                key={index}
                href={`/administrator/articles/${post.id}`}
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
                  <p>{post.status}</p>
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
