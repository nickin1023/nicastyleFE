import {
  GetPostsRequest,
  GetPostsResponse,
  Pagination,
  Post
} from "@/server/types/entity/post";
import { NUMBER_OF_PAGE } from "@/src/consts";
import { getArticles } from "@/src/features/articles/api/getArticles";
import { ArticleList } from "@/src/features/articles/component/articleList";
import { ArticleListProps } from "@/src/features/articles/types/articleContent";
import { GetServerSideProps } from "next";

export default function ArticleListPage({
  initialPosts,
  initialPagination,
  initialIsError
}: ArticleListProps) {
  return (
    <>
      <ArticleList
        initialPosts={initialPosts}
        initialPagination={initialPagination}
        initialIsError={initialIsError}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let initialPosts: Post[] | null = null;
  let initialPagination: Pagination | null = null;
  let initialIsError = false;
  try {
    const req: GetPostsRequest = { page: 1, limit: NUMBER_OF_PAGE };
    const res: GetPostsResponse = await getArticles(req);
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
