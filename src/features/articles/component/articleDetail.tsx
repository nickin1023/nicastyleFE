import { Post } from "@/server/types/entity/post";
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
import { ArticleContent } from "./articleContent";

interface ArticleDetailProps {
  post?: Post | undefined;
  isError: boolean;
}

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
        <div className="relative bg-gray-500 flex flex-col">
          <div className="container bg-white mx-auto my-5 px-5 py-5">
            <p>other content</p>
          </div>
          <div className="container mx-auto my-5 px-5 py-5 bg-white">
            <ArticleContent
              title={post.title}
              featureImageUrl={post.featureImageUrl}
              html={post.html}
              published_at={post.published_at}
              updated_at={post.updated_at}
            />
          </div>
          <div className="container bg-white mx-auto my-5 px-5 py-5">
            <form onKeyDown={handleFormSubmit}>
              <TextAreaForm
                variant={"primary"}
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
                <p className="error-message">{errors.main?.message}</p>
              )}
              <Button
                variant={"primary"}
                className="m-5"
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
