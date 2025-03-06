import {
  AdminPost,
  GetAdminPostRequest,
  GetAdminPostsResponse
} from "@/server/types/entity/adminPost";
import { Button } from "@/src/components/atoms/button/Button";
import { InternalServerError } from "@/src/components/templates/internalServerError";
import { useErrorState } from "@/src/hooks/useErrorState";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getArticles } from "../api/articles";

export const AdminArticleList = () => {
  const router = useRouter();

  const { isError, setErrorState } = useErrorState();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [posts, setPosts] = useState<AdminPost[] | null>();

  useEffect(() => {
    const getData = async () => {
      const req: GetAdminPostRequest = {};
      const res: GetAdminPostsResponse = await getArticles(req);
      setErrorState(res.result);
      setPosts(res.posts);
      setIsReady(true);
    };
    getData();
  }, [setErrorState]);

  if (!isReady) return <p>loading</p>;
  if (isError) return <InternalServerError />;

  return (
    <>
      {!isError ? (
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
          {posts ? (
            <ul>
              {posts.map((post, index) => (
                <li key={index}>
                  <Link href={`/administrator/articles/${post.id}`}>
                    {post.title}, {post.status}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>記事はありません。</p>
          )}
        </div>
      ) : (
        <InternalServerError />
      )}
    </>
  );
};
