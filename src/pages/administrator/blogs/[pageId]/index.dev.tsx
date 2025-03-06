import {
  AdminPost,
  GetAdminPostRequest,
  GetAdminPostsResponse
} from "@/server/types/entity/adminPost";
import { getBlogs } from "@/src/features/administrator/blogs/api/blogs";
import { AdminBlogDetail } from "@/src/features/administrator/blogs/component/adminBlogDetail";
import { GetServerSideProps } from "next";

interface AdminBlogDetailPageProps {
  post?: AdminPost | undefined;
  isError: boolean;
}

export default function Page({ post, isError }: AdminBlogDetailPageProps) {
  return (
    <>
      <AdminBlogDetail post={post} isError={isError} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pageId } = context.query;
  let post: AdminPost | null = null;
  let isError = false;
  try {
    const req: GetAdminPostRequest = { id: String(pageId) };
    const res: GetAdminPostsResponse = await getBlogs(req);
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
