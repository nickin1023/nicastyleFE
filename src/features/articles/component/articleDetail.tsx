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
        <div className="mx-3 md:mx-10 relative flex flex-col">
          <div className="my-3 md:mt-10">
            <ArticleContent
              title={post.title}
              featureImageUrl={post.featureImageUrl}
              html={post.html}
              published_at={post.published_at}
              updated_at={post.updated_at}
            />
          </div>
          <div className="mb-10 bg-white rounded-lg">
            <form onKeyDown={handleFormSubmit} className="text-xl">
              <TextAreaForm
                labelVariant={"simple"}
                textAreaVariant={"primary"}
                formName="comment"
                type="text"
                labelName="コメント"
                rows={5}
                required={false}
                {...register("main", {
                  required: "コメントを入力してください"
                })}
              />
              {errors.main?.message && (
                <p className="error-message mx-5 text-sm">
                  {errors.main?.message}
                </p>
              )}
              <Button
                variant={"icon"}
                className="m-5 ml-5"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                送信
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
