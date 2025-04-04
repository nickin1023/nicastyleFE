import { Breadcrumb } from "@/src/components/organisms/breadcrumb/Breadcrumb";
import Link from "next/link";

export default function AdminPage() {
  return (
    <>
      <Breadcrumb />
      <div className="flex justify-center">
        <ul className="flex gap-10 m-5">
          <li>
            <Link href="/administrator/articles?page=1">記事管理</Link>
          </li>
          <li>
            <Link href="/administrator/images">画像管理</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
