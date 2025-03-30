import Image from "next/image";
import Link from "next/link";
export const ImageList = () => {
  return (
    <>
      <Link href="/administrator/images/upload">
        <p className="border border-black m-5 inline-block px-2">
          新規アップロード
        </p>
      </Link>
      <ul className="flex gap-5 m-5">
        <li>
          <Image
            src="http://localhost:3030/api/images/2024/12/IMG_8566.PNG"
            alt="tai"
            width={200}
            height={200}
          />
        </li>
      </ul>
    </>
  );
};
