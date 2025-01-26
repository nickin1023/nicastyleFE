import {
  GetAdminPostRequest,
  GetAdminPostsResponse,
} from "@/server/types/entity/adminPost";
import { Button } from "@/src/components/atoms/button/Button";
import {
  Dialog,
  DialogArgs,
  initialDialogArgs,
} from "@/src/components/organisms/dialog/Dialog";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBlogs } from "../api/getBlogs";
import { AdminBlogDetailParams } from "../types/blogDetail";
import { AdminBlogContent } from "./blogContent";

export const AdminBlogDetail = (params: AdminBlogDetailParams) => {
  const { isEdit } = params;

  // 通信のステータス
  const [status, setStatus] = useState<string>("");

  // 記事の情報
  const [title, setTitle] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [postStatus, setPostStatus] = useState<string>("");
  const [html, setHtml] = useState<string>("");

  // 描画準備がOKか
  const [isReady, setIsReady] = useState<boolean>(false);

  const router = useRouter();
  const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogInfo, setDialogInfo] = useState<DialogArgs>(initialDialogArgs);
  const [isPreview, setIsPreview] = useState<boolean>(false);

  const getData = async (pageId: string) => {
    const req: GetAdminPostRequest = { id: pageId };
    const res: GetAdminPostsResponse = await getBlogs(req);
    setStatus(res.result);
    setTitle(res.posts![0].title);
    setId(res.posts![0].id);
    setPostStatus(res.posts![0].status);
    setHtml(res.posts![0].html);
    setIsReady(true);
  };

  const onClickUpdate = () => {
    setDialogInfo({
      variant: "primary",
      title: "更新",
      content: "記事を更新しますか？",
      onClickOk: () => setIsDialogOpen(false),
    });
    setIsDialogOpen(true);
  };

  const onClickPublish = () => {
    setDialogInfo({
      variant: "primary",
      title: "公開",
      content: "記事を公開しますか？",
      onClickOk: () => setIsDialogOpen(false),
    });
    setIsDialogOpen(true);
  };

  const onClickUnpublish = () => {
    setDialogInfo({
      variant: "primary",
      title: "非公開",
      content: "記事を非公開にしますか？",
      onClickOk: () => setIsDialogOpen(false),
    });
    setIsDialogOpen(true);
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { pageId } = router.query;
    getData(String(pageId));
  }, [router.isReady, router.query]);

  return (
    <>
      {isReady ? (
        <>
          <div className="relative bg-gray-500 flex flex-col">
            <div className="container mx-auto justify-between my-2 flex">
              <div>
                {!isPreview && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      router.back();
                    }}
                  >
                    戻る
                  </Button>
                )}
              </div>
              <div className="flex">
                {isEdit ? (
                  <>
                    {isPreview ? (
                      <Button
                        variant="primary"
                        onClick={() => {
                          setIsPreview(false);
                        }}
                      >
                        プレビューをやめる
                      </Button>
                    ) : (
                      <>
                        <Button variant="primary" onClick={onClickUpdate}>
                          更新
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setIsPreview(true);
                          }}
                        >
                          プレビュー
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => {
                        router.push(`/administrator/blogs/${id}/edit`);
                      }}
                    >
                      編集
                    </Button>
                    {postStatus === "draft" ? (
                      <Button variant="primary" onClick={onClickPublish}>
                        公開する
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={onClickUnpublish}>
                        非公開にする
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="container bg-white mx-auto my-2 px-5 py-5">
              <p>id: {id}</p>
              <p>status: {postStatus}</p>
            </div>
            <div className="container mx-auto my-2 px-5 py-5 bg-white">
              <p>title: {title}</p>
              <AdminBlogContent
                html={html}
                setHtml={setHtml}
                isEdit={isEdit}
                isPreview={isPreview}
              />
            </div>
          </div>
          {isDialogOpen && (
            <Dialog
              variant={dialogInfo.variant}
              title={dialogInfo.title}
              content={dialogInfo.content}
              isOpen={isDialogOpen}
              setIsOpen={setIsDialogOpen}
              onClickOk={dialogInfo.onClickOk}
            />
          )}
        </>
      ) : (
        <p>hoge</p>
      )}
    </>
  );
};
