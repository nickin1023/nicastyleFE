import {
  GetAdminPostRequest,
  GetAdminPostResponse,
  SetAdminPostParams
} from "@/server/types/entity/adminPost";
import { Button } from "@/src/components/atoms/button/Button";
import {
  Dialog,
  DialogArgs,
  initialDialogArgs
} from "@/src/components/organisms/dialog/Dialog";
import { Snackbar } from "@/src/components/organisms/snackbar/Snackbar";
import { InternalServerError } from "@/src/components/templates/internalServerError";
import { NotFound } from "@/src/components/templates/notFound";
import { useErrorState } from "@/src/hooks/useErrorState";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getArticle } from "../api/articles";
import {
  ClientSetParams,
  initialSetAdminPostParams
} from "../consts/articleContent";
import { useSendData } from "../hooks/useSendData";
import { AdminArticleContent } from "./adminArticleContent";

export const AdminArticleEditor = () => {
  // 記事の情報
  const [title, setTitle] = useState<string>("");
  const [featureImageUrl, setFeatureImageUrl] = useState<string | undefined>(
    ""
  );
  const [id, setId] = useState<string>("");
  const [postStatus, setPostStatus] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [publishedAt, setPublishedAt] = useState<string | undefined>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [oldPost, setOldPost] = useState<ClientSetParams>(
    initialSetAdminPostParams
  );
  const { isShow, message, variant, sendData, openSnackBar } = useSendData();

  // 描画準備がOKか
  const [isReady, setIsReady] = useState<boolean>(false);
  const { isError, setErrorState } = useErrorState();
  const [notFound, setNotFound] = useState<boolean>(false);

  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogInfo, setDialogInfo] = useState<DialogArgs>(initialDialogArgs);
  const [isPreview, setIsPreview] = useState<boolean>(false);

  // 更新ボタン
  const onClickUpdate = () => {
    setDialogInfo({
      variant: "primary",
      title: "更新",
      content: "記事を更新しますか？",
      execButtonLabel: "更新",
      onClickOk: () => onExecUpdate()
    });
    setIsDialogOpen(true);
  };

  // 更新ダイアログ
  const onExecUpdate = () => {
    const setParams = compare({
      id: id,
      title: title,
      featureImageUrl: featureImageUrl,
      html: html
    });
    setIsDialogOpen(false);
    if (!setParams) {
      openSnackBar("差分はありません。", "success");
      return;
    }
    const serverSetParams: SetAdminPostParams = {
      ...setParams,
      updated_at: updatedAt
    };
    sendData(serverSetParams);
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { pageId } = router.query;
    const getData = async (pageId: string) => {
      const req: GetAdminPostRequest = { id: pageId };
      const res: GetAdminPostResponse = await getArticle(req);

      setErrorState(res.result);

      if (!res.post) {
        setNotFound(true);
        setIsReady(true);
        return;
      }

      setTitle(res.post.title);
      setFeatureImageUrl(res.post.featureImageUrl);
      setId(res.post.id);
      setPostStatus(res.post.status);
      setHtml(res.post.html);
      setPublishedAt(res.post.published_at);
      setUpdatedAt(res.post.updated_at);
      setOldPost({
        title: res.post.title,
        id: res.post.id,
        html: res.post.html
      });

      setIsReady(true);
    };
    getData(String(pageId));
  }, [router.isReady, router.query, setErrorState]);

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

  if (!isReady) return <p>loading</p>;
  if (isError) return <InternalServerError />;

  return (
    <>
      <Snackbar isShow={isShow} message={message} variant={variant} />
      {!notFound ? (
        <div className="relative flex flex-col">
          <div className="mx-10 justify-between my-2 flex">
            <div>
              {!isPreview && (
                <Button
                  variant="primary"
                  onClick={() => {
                    router.push(`/administrator/articles/${id}`);
                  }}
                >
                  戻る
                </Button>
              )}
            </div>
            <div className="flex">
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
            </div>
          </div>
          <div className="bg-white mx-10 my-2 px-5 py-5">
            <p>id: {id}</p>
            <p>status: {postStatus}</p>
          </div>
          <div className="mx-10 my-2 px-5 py-5 bg-white">
            <AdminArticleContent
              html={html}
              setHtml={setHtml}
              title={title}
              setTitle={setTitle}
              featureImageUrl={featureImageUrl}
              setFeatureImageUrl={setFeatureImageUrl}
              isPreview={isPreview}
              publishedAt={publishedAt}
              updatedAt={updatedAt}
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
