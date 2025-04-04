import { Button } from "@/src/components/atoms/button/Button";
import { Pagination } from "@/src/components/organisms/pagination/Pagination";
import { InternalServerError } from "@/src/components/templates/internalServerError";
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
      <h1>ブログ一覧</h1>
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
          <ul>
            {posts.map((post, index) => (
              <li key={index}>
                <Link href={`/administrator/articles/${post.id}`}>
                  {post.title}, {post.status}
                </Link>
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
