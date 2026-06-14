import {
  MailMessage,
  SendMailRequest,
  SendMailResponse
} from "@/server/types/entity/sendMail";
import { Button } from "@/src/components/atoms/button/Button";
import { TextAreaForm } from "@/src/components/molecules/textAreaForm/TextAreaForm";
import { Snackbar } from "@/src/components/organisms/snackbar/Snackbar";
import { InternalServerError } from "@/src/components/templates/internalServerError";
import { NotFound } from "@/src/components/templates/notFound";
import { sendMail } from "@/src/features/contact/api/sendMail";
import { useSnackbar } from "@/src/hooks/useSnackbar";
import { KeyboardEventHandler } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArticleDetailProps } from "../types/articleContent";
import { ArticleContent } from "./articleContent";

export const ArticleDetail = ({ post, isError }: ArticleDetailProps) => {
  const { isShow, message, variant, openSnackBar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<MailMessage>();

  const onSubmit: SubmitHandler<MailMessage> = async (mailMessage) => {
    const mailRequest: SendMailRequest = {
      type: "Comment",
      message: {
        main: mailMessage.main,
        commentInfo: {
          // ボタン自体、記事がないと表示されないので無視
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          title: post?.title!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          id: post?.id!
        }
      }
    };
    const res: SendMailResponse = await sendMail(mailRequest);
    if (res.result === "Success") {
      openSnackBar("送信に成功しました。", "success");
      reset();
    } else {
      openSnackBar("送信に失敗しました。再度お試しください。", "warn");
    }
  };

  const handleFormSubmit: KeyboardEventHandler = (e) => {
    if (e.target instanceof HTMLTextAreaElement) return;
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  if (isError) return <InternalServerError />;

  return (
    <>
      <Snackbar isShow={isShow} message={message} variant={variant} />
      {post ? (
        <div className="max-w-4xl mx-auto px-4 md:px-0 relative flex flex-col pb-16 animate-fade-in-up">
          <div className="my-3 md:mt-10">
            <ArticleContent
              title={post.title}
              featureImageUrl={post.featureImageUrl}
              html={post.html}
              published_at={post.published_at}
              updated_at={post.updated_at}
            />
          </div>
          <div className="mb-10 bg-white border border-neutral-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] p-6 md:p-10 mt-8">
            <h3 className="text-xl font-bold mb-6 text-neutral-800 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" className="text-neutral-500">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12c0 2.2.8 4.2 2.1 5.8L3 21l3.2-.9c1.6 1.3 3.6 2.1 5.8 2.1c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.87 0-3.62-.62-5.04-1.67L5 19l.7-2.1C4.62 15.62 4 13.87 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"/>
              </svg>
              コメントを残す
            </h3>
            <form onKeyDown={handleFormSubmit} className="space-y-4">
              <TextAreaForm
                labelVariant={"simple"}
                textAreaVariant={"primary"}
                formName="comment"
                type="text"
                labelName="コメント本文"
                rows={5}
                required={false}
                {...register("main", {
                  required: "コメントを入力してください"
                })}
              />
              {errors.main?.message && (
                <p className="error-message mx-4 text-sm text-red-500 font-medium">
                  {errors.main?.message}
                </p>
              )}
              <Button
                variant={"simple"}
                className="h-11 px-8 rounded-xl bg-amber-500 text-white font-semibold shadow-md hover:bg-amber-600 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 mx-4 my-2"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                コメントを送信
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};
