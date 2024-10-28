import { useRouter } from "next/router";

export default function blogs() {
  const router = useRouter();
  return <p>pageId: {router.query.pageId}</p>;
}
