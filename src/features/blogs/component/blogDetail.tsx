import {
  GetPostRequest,
  GetPostsResponse,
  Post,
} from "@/server/types/entity/post";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBlogs } from "../api/getBlogs";
import { options } from "../util/htmlReplacer";

export const BlogDetail = () => {
  const [status, setStatus] = useState<string>();
  const [post, setPost] = useState<Post | null>();
  const router = useRouter();

  const getData = async (pageId: string) => {
    const req: GetPostRequest = { id: pageId };
    const res: GetPostsResponse = await getBlogs(req);
    setStatus(res.result);
    setPost(res.posts![0]);
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { pageId } = router.query;
    getData(String(pageId));
  }, [router.isReady, router.query]);

  return (
    <div className="relative">
      {post ? (
        <>
          <p>title: {post.title}</p>
          <p>id: {post.id}</p>
          <p>html</p>
          {parse(post.html, options)}
        </>
      ) : (
        <p>記事はありません。</p>
      )}
    </div>
  );
};
