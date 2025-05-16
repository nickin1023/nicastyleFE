import { InternalServerError } from "@/src/components/templates/internalServerError";
import Image from "next/image";
import Link from "next/link";
import { ArticleCarouselProps } from "../types/articleContent";

import "swiper/css";
import "swiper/css/pagination";

export const ArticleCarousel = ({ posts, isError }: ArticleCarouselProps) => {
  if (isError) return <InternalServerError />;

  return (
    <div className="relative">
      {posts && posts.length ? (
        <div className="relative w-full max-w-2xl mx-auto py-8">
          {posts.map((post) => (
            <Link
              className="block bg-white rounded-lg overflow-hidden"
              href={`/articles/${post.id}`}
              key={post.id}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={
                    post.featureImageUrl ? post.featureImageUrl : "/noimage.png"
                  }
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 40vw"
                />
              </div>
              <div className="p-3">
                <h2 className="text-base font-semibold line-clamp-2">
                  {post.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>記事はありません。</p>
      )}
    </div>
  );
};
