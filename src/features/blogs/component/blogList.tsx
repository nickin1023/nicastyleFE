import {
  GetPostRequest,
  GetPostsResponse,
  Post
} from "@/server/types/entity/post";
import { InternalServerError } from "@/src/components/templates/internalServerError";
import { useErrorState } from "@/src/hooks/useErrorState";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBlogs } from "../api/getBlogs";

export const BlogList = () => {
  const { isError, setErrorState } = useErrorState();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[] | null>();

  useEffect(() => {
    const getData = async () => {
      const req: GetPostRequest = {};
      const res: GetPostsResponse = await getBlogs(req);
      setErrorState(res.result);
      setPosts(res.posts);
      setIsReady(true);
    };
    getData();
  }, [setErrorState]);

  if (!isReady) return <p>loading</p>;
  if (isError) return <InternalServerError />;

  return (
    <div className="relative">
      <h1>ブログ一覧</h1>
      {posts ? (
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <Link href={`/blogs/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>記事はありません。</p>
      )}
    </div>
  );
};
