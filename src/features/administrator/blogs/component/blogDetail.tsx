import {
  GetAdminPostRequest,
  GetAdminPostsResponse,
  SetAdminPostParams,
} from "@/server/types/entity/adminPost";
import { Button } from "@/src/components/atoms/button/Button";
import {
  Dialog,
  DialogArgs,
  initialDialogArgs,
} from "@/src/components/organisms/dialog/Dialog";
import { Snackbar } from "@/src/components/organisms/snackbar/Snackbar";
import { useSnackbar } from "@/src/hooks/useSnackbar";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBlogs, setBlog } from "../api/blogs";
import {
  ClientSetParams,
  initialSetAdminPostParams,
} from "../consts/blogContent";
import { AdminBlogDetailParams } from "../types/blogDetail";
import { AdminBlogContent } from "./blogContent";

export const AdminBlogDetail = (params: AdminBlogDetailParams) => {
  const { isEdit } = params;

  // 記事の情報
  const [title, setTitle] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [postStatus, setPostStatus] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [oldPost, setOldPost] = useState<ClientSetParams>(
    initialSetAdminPostParams
  );

  // 描画準備がOKか
  const [isReady, setIsReady] = useState<boolean>(false);

  const router = useRouter();
  const { isShow, message, variant, openSnackBar } = useSnackbar();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogInfo, setDialogInfo] = useState<DialogArgs>(initialDialogArgs);
  const [isPreview, setIsPreview] = useState<boolean>(false);

  // 表示のデータ取得
  const getData = async (pageId: string) => {
    const req: GetAdminPostRequest = { id: pageId };
    const res: GetAdminPostsResponse = await getBlogs(req);

    setTitle(res.posts![0].title);
    setId(res.posts![0].id);
    setPostStatus(res.posts![0].status);
    setHtml(res.posts![0].html);
    setUpdatedAt(res.posts![0].updated_at);
    setOldPost({
      title: res.posts![0].title,
      id: res.posts![0].id,
      html: res.posts![0].html,
    });

    setIsReady(true);
  };

  // 編集、状態更新のset
  const setData = async (setParams: SetAdminPostParams) => {
    const res = await setBlog(setParams);
    if (res.result == "Failure") {
      openSnackBar("更新に失敗しました。", "warn");
    } else {
      openSnackBar("更新に成功しました。", "success");
    }
  };

  // 更新ボタン
  const onClickUpdate = () => {
    setDialogInfo({
      variant: "primary",
      title: "更新",
      content: "記事を更新しますか？",
      execButtonLabel: "更新",
      onClickOk: () => onExecUpdate(),
    });
    setIsDialogOpen(true);
  };

  // 更新ダイアログ
  const onExecUpdate = () => {
    const setParams = compare({
      id: id,
      title: title,
      html: html,
    });
    setIsDialogOpen(false);
    if (!setParams) {
      openSnackBar("差分はありません。", "success");
      return;
    }
    const serverSetParams: SetAdminPostParams = {
      ...setParams,
      updated_at: updatedAt,
    };
    setData(serverSetParams);
  };

  // 公開ボタン
  const onClickPublish = () => {
    setDialogInfo({
      variant: "primary",
      title: "公開",
      content: "記事を公開しますか？",
      execButtonLabel: "実行",
      onClickOk: () => onExecSwitch("published"),
    });
    setIsDialogOpen(true);
  };

  // 非公開ボタン
  const onClickUnpublish = () => {
    setDialogInfo({
      variant: "primary",
      title: "非公開",
      content: "記事を非公開にしますか？",
      execButtonLabel: "実行",
      onClickOk: () => onExecSwitch("draft"),
    });
    setIsDialogOpen(true);
  };

  // 公開・非公開ダイアログ実行ボタン
  const onExecSwitch = async (toBeStatus: "published" | "draft") => {
    setIsDialogOpen(false);
    const serverSetParams: SetAdminPostParams = {
      id: id,
      status: toBeStatus,
      updated_at: updatedAt,
    };
    await setData(serverSetParams);
    router.reload();
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { pageId } = router.query;
    getData(String(pageId));
  }, [router.isReady, router.query]);

  // set時の差分確認
  const compare = (params: ClientSetParams): ClientSetParams | null => {
    if (_.isEqual(params, oldPost)) {
      return null;
    }

    const operand: ClientSetParams = { id: id };

    if (!_.isEqual(params.title, oldPost.title)) {
      operand.title = params.title;
    }

    if (!_.isEqual(params.featureImageUrl, oldPost.featureImageUrl)) {
      operand.featureImageUrl = params.featureImageUrl;
    }

    if (!_.isEqual(params.html, oldPost.html)) {
      operand.html = params.html;
    }

    return operand;
  };

  return (
    <>
      {isReady ? (
        <>
          <Snackbar isShow={isShow} message={message} variant={variant} />
          <div className="relative bg-gray-500 flex flex-col">
            <div className="container mx-auto justify-between my-2 flex">
              <div>
                {!isPreview && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (isEdit) {
                        router.push(`/administrator/blogs/${id}`);
                      } else {
                        router.push(`/administrator/blogs`);
                      }
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
              <AdminBlogContent
                html={html}
                setHtml={setHtml}
                title={title}
                setTitle={setTitle}
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
              execButtonLabel={dialogInfo.execButtonLabel}
              onClickOk={dialogInfo.onClickOk}
            />
          )}
        </>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};
