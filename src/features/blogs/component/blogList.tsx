import {
  GetPostRequest,
  GetPostsResponse,
  Post
} from "@/server/types/entity/post";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBlogs } from "../api/getBlogs";

export const BlogList = () => {
  const [status, setStatus] = useState<string>();
  const [posts, setPosts] = useState<Post[] | null>();

  const getData = async () => {
    const req: GetPostRequest = {};
    const res: GetPostsResponse = await getBlogs(req);
    setStatus(res.result);
    setPosts(res.posts);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="relative">
      <h1>ブログ一覧</h1>
      <p>status: {status}</p>
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
