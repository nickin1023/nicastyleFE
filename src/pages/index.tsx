import Image from "next/image";
import { useEffect, useState } from "react";
import { TOP } from "../consts/strings";

export default function Home() {
  const images = [
    "/separateLogo_n.png",
    "/separateLogo_i.png",
    "/separateLogo_c.png",
    "/separateLogo_a.png",
    "/separateLogo_alpha.png"
  ];

  const [visibleCount, setVisibleCount] = useState(0);
  const [showCaret, setShowCaret] = useState(true);

  // 文字の表示までの速度
  useEffect(() => {
    if (visibleCount < images.length) {
      const delay = () => {
        switch (visibleCount) {
          case 0:
            return 1000;
          case images.length - 1:
            return 2000;
          default:
            return 300;
        }
      };
      const timeout = setTimeout(
        () => setVisibleCount(visibleCount + 1),
        delay()
      );
      return () => clearTimeout(timeout);
    }
  }, [visibleCount]);

  // タイプライターの点滅間隔
  useEffect(() => {
    const interval = setInterval(() => setShowCaret((c) => !c), 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative aspect-[3/4] md:aspect-[16/8]">
        <div className="absolute top-0 left-1 z-10 pointer-events-none w-[128px] h-[128px] md:w-[160px] md:h-[160px]">
          <Image
            src={"/decoration/plant1.png"}
            alt="decoration-plant1"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <div className="flex items-center justify-center h-full space-x-2 font-mono ml-4 mr-2">
          <div
            className="inline-block"
            style={{
              position: "relative",
              minHeight: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img
              src={"/separateLogo_>.png"}
              alt=""
              style={{
                display: "block",
                maxWidth: "100%",
                maxHeight: "100%"
              }}
            />
          </div>
          {images.map((src, i) => (
            <div
              key={i}
              className="relative inline-block"
              style={{
                position: "relative",
                minHeight: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img
                src={src}
                alt=""
                style={{
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  opacity: i < visibleCount ? 1 : 0,
                  transition: "opacity 0.3s ease"
                }}
              />
              {i === visibleCount && (
                <span
                  className={`absolute top-0 left-0 w-[4vw] h-full bg-gray-950 transition-opacity duration-300 ${
                    showCaret ? "opacity-100" : "opacity-0"
                  }`}
                ></span>
              )}
            </div>
          ))}
        </div>
        <div className="absolute bottom-1 right-1 z-20 pointer-events-none w-[128px] h-[128px] md:w-[200px] md:h-[200px]">
          <Image
            src={"/decoration/plant3.png"}
            alt="decoration-plant3"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>
      <div className="min-h-[60vh] flex items-center justify-center p-4 mb-10">
        <div className="max-w-full md:max-w-[80%] w-full border bg-white border-gray-200 rounded-2xl shadow-lg p-10 text-center">
          <h1 className="text-4xl font-bold mb-6 tracking-wide">
            {TOP.TOP_MESSAGE}
          </h1>
          <div className="text-lg text-center break-normal md:break-keep">
            <div className="py-2">
              {Object.entries(TOP.MESSAGE1).map(([key, value]) => (
                <p key={key}>{value as string}</p>
              ))}
            </div>
            <div className="py-2">
              {Object.entries(TOP.MESSAGE2).map(([key, value]) => (
                <p key={key}>{value as string}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
