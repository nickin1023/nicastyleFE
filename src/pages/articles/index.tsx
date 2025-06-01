import {
  GetPostsRequest,
  GetPostsResponse,
  PaginationInfo,
  Post
} from "@/server/types/entity/post";
import { NUMBER_OF_PAGE } from "@/src/consts/numbers";
import { getArticles } from "@/src/features/articles/api/getArticles";
import { ArticleList } from "@/src/features/articles/component/articleList";
import { ArticleListProps } from "@/src/features/articles/types/articleContent";
import { GetServerSideProps } from "next";

export default function ArticleListPage({
  posts,
  pagination,
  isError
}: ArticleListProps) {
  return (
    <ArticleList posts={posts} pagination={pagination} isError={isError} />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let posts: Post[] | null = null;
  let pagination: PaginationInfo | null = null;
  let isError = false;
  const page = Number(context.query.page) || 1;

  try {
    const req: GetPostsRequest = { page: page, limit: NUMBER_OF_PAGE };
    const res: GetPostsResponse = await getArticles(req);
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
