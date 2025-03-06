import { AdminPost, SetAdminPostParams } from "@/server/types/entity/adminPost";
import { Button } from "@/src/components/atoms/button/Button";
import {
  Dialog,
  DialogArgs,
  initialDialogArgs
} from "@/src/components/organisms/dialog/Dialog";
import { Snackbar } from "@/src/components/organisms/snackbar/Snackbar";
import { InternalServerError } from "@/src/components/templates/internalServerError";
import { NotFound } from "@/src/components/templates/notFound";
import { ArticleContent } from "@/src/features/articles/component/articleContent";
import { useSnackbar } from "@/src/hooks/useSnackbar";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSendData } from "../hooks/useSendData";

interface AdminArticleDetailProps {
  post?: AdminPost | undefined;
  isError: boolean;
}

export const AdminArticleDetail = ({
  post,
  isError
}: AdminArticleDetailProps) => {
  const router = useRouter();
  const { isShow, message, variant } = useSnackbar();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogInfo, setDialogInfo] = useState<DialogArgs>(initialDialogArgs);
  const { sendData } = useSendData();

  // 公開ボタン
  const onClickPublish = () => {
    setDialogInfo({
      variant: "primary",
      title: "公開",
      content: "記事を公開しますか？",
      execButtonLabel: "実行",
      onClickOk: () => onExecSwitch("published")
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
      onClickOk: () => onExecSwitch("draft")
    });
    setIsDialogOpen(true);
  };

  // 公開・非公開ダイアログ実行ボタン
  const onExecSwitch = async (toBeStatus: "published" | "draft") => {
    setIsDialogOpen(false);
    const serverSetParams: SetAdminPostParams = {
      id: post!.id,
      status: toBeStatus,
      updated_at: post!.updated_at
    };
    await sendData(serverSetParams);
  };

  if (isError) return <InternalServerError />;

  return (
    <>
      <Snackbar isShow={isShow} message={message} variant={variant} />
      {post ? (
        <div className="relative bg-gray-500 flex flex-col">
          <div className="container mx-auto justify-between my-2 flex">
            <div>
              <Button
                variant="primary"
                onClick={() => {
                  router.push(`/administrator/articles`);
                }}
              >
                戻る
              </Button>
            </div>
            <div className="flex">
              <Button
                variant="primary"
                onClick={() => {
                  router.push(`/administrator/articles/${post!.id}/edit`);
                }}
              >
                編集
              </Button>
              {post!.status === "draft" ? (
                <Button variant="primary" onClick={onClickPublish}>
                  公開する
                </Button>
              ) : (
                <Button variant="primary" onClick={onClickUnpublish}>
                  非公開にする
                </Button>
              )}
            </div>
          </div>
          <div className="container bg-white mx-auto my-2 px-5 py-5">
            <p>id: {post!.id}</p>
            <p>status: {post!.status}</p>
          </div>
          <div className="container mx-auto my-2 px-5 py-5 bg-white">
            <ArticleContent
              title={post!.title}
              html={post!.html}
              published_at={post!.published_at}
              updated_at={post!.updated_at}
            />
          </div>
        </div>
      ) : (
        <NotFound />
      )}
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
  );
};
