import {
  AdminPost,
  GetAdminPostRequest,
  GetAdminPostResponse
} from "@/server/types/entity/adminPost";
import { Breadcrumb } from "@/src/components/organisms/breadcrumb/Breadcrumb";
import { getArticle } from "@/src/features/administrator/articles/api/articles";
import { AdminArticleDetail } from "@/src/features/administrator/articles/component/adminArticleDetail";
import { AdminArticleDetailProps } from "@/src/features/administrator/articles/types/articleContent";
import { GetServerSideProps } from "next";

export default function AdminArticleDetailPage({
  post,
  isError
}: AdminArticleDetailProps) {
  return (
    <>
      <Breadcrumb />
      <AdminArticleDetail post={post} isError={isError} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pageId } = context.query;
  let post: AdminPost | null = null;
  let isError = false;
  try {
    const req: GetAdminPostRequest = { id: String(pageId) };
    const res: GetAdminPostResponse = await getArticle(req);
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
