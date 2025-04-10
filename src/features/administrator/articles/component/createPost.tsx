import { AddAdminPostParams } from "@/server/types/entity/adminPost";
import { Button } from "@/src/components/atoms/button/Button";
import {
  Dialog,
  DialogArgs,
  initialDialogArgs
} from "@/src/components/organisms/dialog/Dialog";
import { Snackbar } from "@/src/components/organisms/snackbar/Snackbar";
import { useSnackbar } from "@/src/hooks/useSnackbar";
import { useRouter } from "next/router";
import { useState } from "react";
import { addArticle } from "../api/articles";
import { AdminArticleContent } from "./adminArticleContent";

export const CreatePost = () => {
  // 記事の情報
  const [title, setTitle] = useState<string>("");
  const [featureImageUrl, setFeatureImageUrl] = useState<string | undefined>(
    ""
  );
  const [html, setHtml] = useState<string>(
    "<!--kg-card-begin: html-->\n\n<!--kg-card-end: html-->"
  );

  const router = useRouter();
  const { isShow, message, variant, openSnackBar } = useSnackbar();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogInfo, setDialogInfo] = useState<DialogArgs>(initialDialogArgs);
  const [isPreview, setIsPreview] = useState<boolean>(false);

  // 編集、状態更新のset
  const addData = async (addParams: AddAdminPostParams) => {
    const res = await addArticle(addParams);
    if (res.result == "Failure") {
      openSnackBar("作成に失敗しました。", "warn");
    } else {
      openSnackBar("作成に成功しました。", "success");
      router.push("/administrator/articles");
    }
  };

  // 更新ボタン
  const onClickCreate = () => {
    setDialogInfo({
      variant: "primary",
      title: "作成",
      content: "記事を作成しますか？",
      execButtonLabel: "作成",
      onClickOk: () => onExecCreate()
    });
    setIsDialogOpen(true);
  };

  // 更新ダイアログ
  const onExecCreate = () => {
    setIsDialogOpen(false);
    addData({ title: title, featureImageUrl: featureImageUrl, html: html });
  };

  return (
    <>
      <Snackbar isShow={isShow} message={message} variant={variant} />
      <div className="relative bg-gray-500 flex flex-col">
        <div className="container mx-auto justify-between my-2 flex">
          <div>
            {!isPreview && (
              <Button
                variant="primary"
                onClick={() => {
                  router.push(`/administrator/articles`);
                }}
              >
                戻る
              </Button>
            )}
          </div>
          <div className="flex">
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
                <Button variant="primary" onClick={onClickCreate}>
                  作成
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
          </div>
        </div>
        <div className="container mx-auto my-2 px-5 py-5 bg-white">
          <AdminArticleContent
            html={html}
            setHtml={setHtml}
            title={title}
            setTitle={setTitle}
            featureImageUrl={featureImageUrl}
            setFeatureImageUrl={setFeatureImageUrl}
            isPreview={isPreview}
            publishedAt={undefined}
            updatedAt={undefined}
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
  );
};
