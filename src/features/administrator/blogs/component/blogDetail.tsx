import {
  AdminPost,
  GetAdminPostRequest,
  GetAdminPostsResponse,
} from "@/server/types/entity/adminPost";
import { Button } from "@/src/components/atoms/button/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBlogs } from "../api/getBlogs";
import { AdminBlogDetailParams } from "../types/blogDetail";
import { AdminBlogContent } from "./blogContent";

export const AdminBlogDetail = (params: AdminBlogDetailParams) => {
  const { isEdit } = params;
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
    <>
      {post ? (
        <div className="relative bg-gray-500 flex flex-col">
          <div className="container mx-auto justify-between my-2 flex">
            <div>
              <Button
                variant="primary"
                onClick={() => {
                  router.back();
                }}
              >
                戻る
              </Button>
            </div>
            <div className="flex">
              {isEdit ? (
                <>
                  <Button variant="primary" onClick={() => {}}>
                    更新
                  </Button>
                  <Button variant="primary" onClick={() => {}}>
                    プレビュー
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="primary"
                    onClick={() => {
                      router.push(`/administrator/blogs/${post!.id}/edit`);
                    }}
                  >
                    編集
                  </Button>
                  <Button variant="primary" onClick={() => {}}>
                    公開
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="container bg-white mx-auto my-2 px-5 py-5">
            <p>id: {post!.id}</p>
            <p>status: {post!.status}</p>
          </div>
          <div className="container mx-auto my-2 px-5 py-5 bg-white">
            {isEdit ? (
              <>
                <p>edit</p>
              </>
            ) : (
              <>
                <p>title: {post.title}</p>
                <p>html</p>
                <AdminBlogContent html={post!.html} isEdit={isEdit} />
              </>
            )}
          </div>
        </div>
      ) : (
        <p>hoge</p>
      )}
    </>
  );
};
