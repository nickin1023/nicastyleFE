import { Breadcrumb } from "@/src/components/organisms/breadcrumb/Breadcrumb";
import { CreatePost } from "@/src/features/administrator/articles/component/createPost";

export default function AdminCreatePostPage() {
  return (
    <>
      <Breadcrumb />
      <CreatePost />
    </>
  );
}
