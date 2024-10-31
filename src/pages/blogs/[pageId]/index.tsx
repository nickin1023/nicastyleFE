import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return <p>pageId: {router.query.pageId}</p>;
}
