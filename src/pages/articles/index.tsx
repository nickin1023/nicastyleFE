import { ArticleList } from "@/src/features/articles/component/articleList";

export default function ArticleListPage() {
  return (
    <>
      <ArticleList />
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const page = Number(context.query.page) || 1;
//   const res = await fetch(`/api/posts?page=${page}`);
//   const initialPosts = await res.json();

//   return { props: { initialPosts } };
// };
