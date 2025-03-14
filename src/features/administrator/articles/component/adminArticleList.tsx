import {
  AdminPost,
  GetAdminPostsRequest,
  GetAdminPostsResponse
} from "@/server/types/entity/adminPost";
import { Pagination } from "@/server/types/entity/post";
import { Button } from "@/src/components/atoms/button/Button";
import { InternalServerError } from "@/src/components/templates/internalServerError";
import { NUMBER_OF_PAGE } from "@/src/consts";
import { useErrorState } from "@/src/hooks/useErrorState";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { getArticles } from "../api/articles";
import { AdminArticleListProps } from "../types/articleContent";

export const AdminArticleList = ({
  initialPosts,
  initialPagination,
  initialIsError
}: AdminArticleListProps) => {
  const router = useRouter();

  const { isError, setErrorState } = useErrorState(initialIsError);
  const [isReady, setIsReady] = useState<boolean>(true);
  const [posts, setPosts] = useState<AdminPost[] | null>(initialPosts);
  const [pagination, setPagination] = useState<Pagination | null>(
    initialPagination
  );

  const onClick = () => {
    setIsReady(false);
    if (!pagination) {
      return;
    }
    const getData = async () => {
      const req: GetAdminPostsRequest = {
        page: pagination.page! + 1,
        limit: NUMBER_OF_PAGE
      };
      const res: GetAdminPostsResponse = await getArticles(req);
      setErrorState(res.result);
      setPosts(res.posts);
      setPagination(res.pagination);
      setIsReady(true);
    };
    getData();
  };

  if (!isReady) return <p>loading</p>;
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
          <button onClick={onClick}>次</button>
        </>
      ) : (
        <p>記事はありません。</p>
      )}
    </div>
  );
};
