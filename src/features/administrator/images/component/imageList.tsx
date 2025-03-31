import {
  AdminPost,
  GetAdminPostRequest,
  GetAdminPostResponse
} from "@/server/types/entity/adminPost";
import { InternalServerError } from "@/src/components/templates/internalServerError";
import { useErrorState } from "@/src/hooks/useErrorState";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPage } from "../api/images";

export const ImageList = () => {
  const { isError, setErrorState } = useErrorState(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [page, setPage] = useState<AdminPost | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const extractListItems = (html: string): string[] => {
    const regex = /<li>(.*?)<\/li>/g;
    const matches = [];
    let match;

    while ((match = regex.exec(html)) !== null) {
      matches.push(match[1]);
    }

    return matches;
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      // 2秒後にコピー状態をリセット
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error("コピーに失敗しました:", error);
    }
  };

  useEffect(() => {
    setIsReady(false);
    const getData = async () => {
      const req: GetAdminPostRequest = {
        id: process.env.NEXT_PUBLIC_IMAGE_MANAGER_ID
      };
      const res: GetAdminPostResponse = await getPage(req);
      setErrorState(res.result);
      setPage(res.post);
      setIsReady(true);
    };
    getData();
  }, [setErrorState]);

  if (!isReady) return <p>loading</p>;
  if (isError) return <InternalServerError />;

  return (
    <div className="bg-slate-100">
      <Link href="/administrator/images/upload">
        <p className="border border-black rounded-tr-2xl rounded-bl-2xl m-5 inline-block px-2 bg-white">
          新規アップロード
        </p>
      </Link>
      <div className="flex justify-center p-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-7xl">
          {extractListItems(page!.html).map((item, index) => {
            return (
              <li key={index} className="list-none">
                <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="relative w-full pt-[75%]">
                    <Image
                      src={item}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-base font-medium break-words text-gray-700">
                      {item}
                    </p>
                    <button
                      onClick={() => copyToClipboard(item, index)}
                      className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            copiedIndex === index
                              ? "M5 13l4 4L19 7"
                              : "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002-2h2a2 2 0 012 2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          }
                        />
                      </svg>
                      {copiedIndex === index ? "コピーしました" : "URLをコピー"}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
