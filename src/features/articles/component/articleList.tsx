import { Pagination } from "@/src/components/organisms/pagination/Pagination";
import { InternalServerError } from "@/src/components/templates/internalServerError";
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
          <ul>
            {posts.map((post, index) => (
              <li key={index}>
                <Link href={`/articles/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
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
