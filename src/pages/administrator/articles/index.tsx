import {
  AdminPost,
  GetAdminPostsRequest,
  GetAdminPostsResponse
} from "@/server/types/entity/adminPost";
import { PaginationInfo } from "@/server/types/entity/post";
import { Breadcrumb } from "@/src/components/organisms/breadcrumb/Breadcrumb";
import { NUMBER_OF_PAGE } from "@/src/consts/numbers";
import { getArticles } from "@/src/features/administrator/articles/api/articles";
import { AdminArticleList } from "@/src/features/administrator/articles/component/adminArticleList";
import { AdminArticleListProps } from "@/src/features/administrator/articles/types/articleContent";
import { GetServerSideProps } from "next";

export default function AdminArticleListPage({
  posts,
  pagination,
  isError
}: AdminArticleListProps) {
  return (
    <>
      <Breadcrumb />
      <AdminArticleList
        posts={posts}
        pagination={pagination}
        isError={isError}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let posts: AdminPost[] | null = null;
  let pagination: PaginationInfo | null = null;
  let isError = false;
  const page = Number(context.query.page) || 1;

  try {
    const req: GetAdminPostsRequest = { page: page, limit: NUMBER_OF_PAGE };
    const res: GetAdminPostsResponse = await getArticles(req);
    if (res.result !== "Success") {
      isError = true;
    } else {
      posts = res.posts;
      pagination = res.pagination;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    isError = true;
  }

  return {
    props: {
      posts,
      pagination,
      isError
    }
  };
};
