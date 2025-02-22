import {
  GetPostRequest,
  GetPostsResponse,
  Post,
} from "@/server/types/entity/post";
import {
  MailMessage,
  SendMailRequest,
  SendMailResponse,
} from "@/server/types/entity/sendMail";
import { Button } from "@/src/components/atoms/button/Button";
import { TextAreaForm } from "@/src/components/molecules/textAreaForm/TextAreaForm";
import { Snackbar } from "@/src/components/organisms/snackbar/Snackbar";
import { NotFound } from "@/src/components/templates/notFound";
import { getBlogs } from "@/src/features/blogs/api/getBlogs";
import { BlogContent } from "@/src/features/blogs/component/blogContent";
import { sendMail } from "@/src/features/contact/api/sendMail";
import { useSnackbar } from "@/src/hooks/useSnackbar";
import { useRouter } from "next/router";
import { KeyboardEventHandler, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const BlogDetail = () => {
  const [status, setStatus] = useState<string>();
  const [post, setPost] = useState<Post | null>();
  const router = useRouter();
  const { isShow, message, variant, openSnackBar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MailMessage>();

  const getData = async (pageId: string) => {
    const req: GetPostRequest = { id: pageId };
    const res: GetPostsResponse = await getBlogs(req);
    setStatus(res.result);
    setPost(res.posts && res.posts[0]);
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { pageId } = router.query;
    getData(String(pageId));
  }, [router.isReady, router.query]);

  const onSubmit: SubmitHandler<MailMessage> = async (mailMessage) => {
    const mailRequest: SendMailRequest = {
      type: "Comment",
      message: {
        main: mailMessage.main,
        commentInfo: {
          title: post?.title!,
          id: post?.id!,
        },
      },
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

  return (
    <>
      <Snackbar isShow={isShow} message={message} variant={variant} />
      {post ? (
        <div className="relative bg-gray-500 flex flex-col">
          <div className="container bg-white mx-auto my-5 px-5 py-5">
            <p>other content</p>
          </div>
          <div className="container mx-auto my-5 px-5 py-5 bg-white">
            <BlogContent
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
                  required: "コメントを入力してください",
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
