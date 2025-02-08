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
import { useRouter } from "next/router";
import { KeyboardEventHandler, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendMail } from "../../contact/api/sendMail";
import { getBlogs } from "../api/getBlogs";
import { BlogContent } from "./blogContent";

export const BlogDetail = () => {
  const [status, setStatus] = useState<string>();
  const [post, setPost] = useState<Post | null>();
  const router = useRouter();
  const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
    setPost(res.posts![0]);
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
      setSnackbarMessage("送信に成功しました。");
      reset();
    } else {
      setSnackbarMessage("送信に失敗しました。再度お試しください。");
    }

    setIsSnackbarVisible(true);
    setTimeout(() => {
      setIsSnackbarVisible(false);
    }, 3000);
  };

  const handleFormSubmit: KeyboardEventHandler = (e) => {
    if (e.target instanceof HTMLTextAreaElement) return;
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="relative bg-gray-500 flex flex-col">
      <div className="container bg-white mx-auto my-5 px-5 py-5">
        <p>other content</p>
      </div>
      <div className="container mx-auto my-5 px-5 py-5 bg-white">
        {post ? (
          <BlogContent
            title={post.title}
            featureImageUrl={post.featureImageUrl}
            html={post.html}
            published_at={post.published_at}
            updated_at={post.updated_at}
          />
        ) : (
          <p>記事はありません。</p>
        )}
      </div>
      <div className="container bg-white mx-auto my-5 px-5 py-5">
        {isSnackbarVisible && (
          <div className="absolute top-0 left-0 right-0 bg-blue-500 text-black px-4 py-3 z-10">
            <p>{snackbarMessage}</p>
          </div>
        )}
        <form onKeyDown={handleFormSubmit}>
          <TextAreaForm
            variant={"primary"}
            formName="comment"
            type="text"
            labelName="コメント"
            rows={5}
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
  );
};
