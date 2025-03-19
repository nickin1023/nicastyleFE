import {
  GetPostRequest,
  GetPostResponse,
  Post
} from "@/server/types/entity/post";
import { getArticle } from "@/src/features/articles/api/getArticle";
import { ArticleDetail } from "@/src/features/articles/component/articleDetail";
import { ArticleDetailProps } from "@/src/features/articles/types/articleContent";
import { GetServerSideProps } from "next";

export default function ArticleDetailPage({
  post,
  isError
}: ArticleDetailProps) {
  return (
    <>
      <ArticleDetail post={post} isError={isError} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pageId } = context.query;
  let post: Post | null = null;
  let isError = false;
  try {
    const req: GetPostRequest = { id: String(pageId) };
    const res: GetPostResponse = await getArticle(req);
    if (res.result !== "Success") {
      isError = true;
    } else {
      post = res.post;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    isError = true;
  }

  return {
    props: {
      post,
      isError
    }
  };
};
