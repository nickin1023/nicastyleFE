import {
  GetPostsRequest,
  GetPostsResponse,
  Pagination,
  Post
} from "@/server/types/entity/post";
import { InternalServerError } from "@/src/components/templates/internalServerError";
import { NUMBER_OF_PAGE } from "@/src/consts";
import { useErrorState } from "@/src/hooks/useErrorState";
import Link from "next/link";
import { useState } from "react";
import { getArticles } from "../api/getArticles";
import { ArticleListProps } from "../types/articleContent";

export const ArticleList = ({
  initialPosts,
  initialPagination,
  initialIsError
}: ArticleListProps) => {
  const { isError, setErrorState } = useErrorState(initialIsError);
  const [isReady, setIsReady] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[] | null>(initialPosts);
  const [pagination, setPagination] = useState<Pagination | null>(
    initialPagination
  );

  const onClick = () => {
    setIsReady(false);
    if (!pagination) {
      return;
    }
    const getData = async () => {
      const req: GetPostsRequest = {
        page: pagination.page! + 1,
        limit: NUMBER_OF_PAGE
      };
      const res: GetPostsResponse = await getArticles(req);
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
      {posts && posts.length ? (
        <>
          <ul>
            {posts.map((post, index) => (
              <li key={index}>
                <Link href={`/articles/${post.id}`}>{post.title}</Link>
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
