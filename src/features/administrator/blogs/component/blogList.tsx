import {
  AdminPost,
  GetAdminPostRequest,
  GetAdminPostsResponse,
} from "@/server/types/entity/adminPost";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBlogs } from "../api/getBlogs";

export const AdminBlogList = () => {
  const [status, setStatus] = useState<string>();
  const [posts, setPosts] = useState<AdminPost[] | null>();

  const getData = async () => {
    const req: GetAdminPostRequest = {};
    const res: GetAdminPostsResponse = await getBlogs(req);
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
              <Link href={`/administrator/blogs/${post.id}`}>
                {post.title}, {post.status}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>記事はありません。</p>
      )}
    </div>
  );
};
