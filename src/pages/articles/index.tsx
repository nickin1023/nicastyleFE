import {
  GetPostsRequest,
  GetPostsResponse,
  PaginationInfo,
  Post
} from "@/server/types/entity/post";
import { NUMBER_OF_PAGE } from "@/src/consts";
import { getArticles } from "@/src/features/articles/api/getArticles";
import { ArticleList } from "@/src/features/articles/component/articleList";
import { ArticleListProps } from "@/src/features/articles/types/articleContent";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ArticleListPage({
  posts,
  pagination,
  isError
}: ArticleListProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router.events]);

  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <ArticleList posts={posts} pagination={pagination} isError={isError} />
      )}
    </>
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
