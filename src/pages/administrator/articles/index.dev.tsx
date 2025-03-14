import {
  AdminPost,
  GetAdminPostsRequest,
  GetAdminPostsResponse
} from "@/server/types/entity/adminPost";
import { Pagination } from "@/server/types/entity/post";
import { NUMBER_OF_PAGE } from "@/src/consts";
import { getArticles } from "@/src/features/administrator/articles/api/articles";
import { AdminArticleList } from "@/src/features/administrator/articles/component/adminArticleList";
import { AdminArticleListProps } from "@/src/features/administrator/articles/types/articleContent";
import { GetServerSideProps } from "next";

export default function AdminArticleListPage({
  initialPosts,
  initialPagination,
  initialIsError
}: AdminArticleListProps) {
  return (
    <>
      <AdminArticleList
        initialPosts={initialPosts}
        initialPagination={initialPagination}
        initialIsError={initialIsError}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let initialPosts: AdminPost[] | null = null;
  let initialPagination: Pagination | null = null;
  let initialIsError = false;
  try {
    const req: GetAdminPostsRequest = { page: 1, limit: NUMBER_OF_PAGE };
    const res: GetAdminPostsResponse = await getArticles(req);
    if (res.result !== "Success") {
      initialIsError = true;
    } else {
      initialPosts = res.posts;
      initialPagination = res.pagination;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    initialIsError = true;
  }

  return {
    props: {
      initialPosts,
      initialPagination,
      initialIsError
    }
  };
};
