import {
  AdminPost,
  GetAdminPostRequest,
  GetAdminPostsResponse,
} from "@/server/types/entity/adminPost";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBlogs } from "../api/getBlogs";
import { AdminBlogContent } from "./blogContent";

export const AdminBlogDetail = () => {
  const [status, setStatus] = useState<string>();
  const [post, setPost] = useState<AdminPost | null>();
  const router = useRouter();
  const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false);

  const getData = async (pageId: string) => {
    const req: GetAdminPostRequest = { id: pageId };
    const res: GetAdminPostsResponse = await getBlogs(req);
    setStatus(res.result);
    setPost(res.posts![0]);
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { pageId } = router.query;
    getData(String(pageId));
  }, [router.isReady, router.query]);

  return (
    <div className="relative bg-gray-500 flex flex-col">
      <div className="container bg-white mx-auto my-5 px-5 py-5">
        <p>other content</p>
      </div>
      <div className="container mx-auto my-5 px-5 py-5 bg-white">
        {post ? (
          <>
            <p>title: {post.title}</p>
            <p>id: {post.id}</p>
            <p>status: {post.status}</p>
            <p>html</p>
            <AdminBlogContent html={post.html} />
          </>
        ) : (
          <p>記事はありません。</p>
        )}
      </div>
    </div>
  );
};
