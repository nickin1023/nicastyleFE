import {
  AdminPost,
  GetAdminPostRequest,
  GetAdminPostsResponse,
} from "@/server/types/entity/adminPost";
import { Button } from "@/src/components/atoms/button/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBlogs } from "../api/blogs";

export const AdminBlogList = () => {
  const router = useRouter();

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
      <Button
        variant="primary"
        onClick={() => {
          router.push(`/administrator/blogs/createPost`);
        }}
      >
        新規作成
      </Button>
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
