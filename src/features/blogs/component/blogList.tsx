import {
  GetPostRequest,
  GetPostsResponse,
  Post,
} from "@/server/types/entity/post";
import { useEffect, useState } from "react";
import { getBlogs } from "../api/getBlogs";

export const BlogList = () => {
  const [status, setStatus] = useState<string>();
  const [posts, setPosts] = useState<Post[] | null>();

  const getData = async () => {
    const req: GetPostRequest = { id: null };
    const res: GetPostsResponse = await getBlogs(req);
    setStatus(res.result);
    setPosts(res.posts);
  };

  useEffect(() => {
    getData();
  }, [posts]);

  return (
    <div className="relative">
      <h1>ブログ一覧</h1>
      <p>status: {status}</p>
      {posts ? (
        <ul>
          {posts.map((post, index) => (
            <li key={index}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <p>記事はありません。</p>
      )}
    </div>
  );
};
