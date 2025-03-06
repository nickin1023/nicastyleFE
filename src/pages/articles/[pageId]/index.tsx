import {
  GetPostRequest,
  GetPostsResponse,
  Post
} from "@/server/types/entity/post";
import { getArticles } from "@/src/features/articles/api/getArticles";
import { ArticleDetail } from "@/src/features/articles/component/articleDetail";
import { GetServerSideProps } from "next";

interface BlogDetailPageProps {
  post?: Post | undefined;
  isError: boolean;
}

export default function BlogDetailPage({ post, isError }: BlogDetailPageProps) {
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
    const res: GetPostsResponse = await getArticles(req);
    if (res.result !== "Success") {
      isError = true;
    } else {
      post = res.posts ? res.posts[0] : null;
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
