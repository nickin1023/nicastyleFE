import { TOP } from "@/src/consts/strings";
import Image from "next/image";
import { useEffect, useState } from "react";

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
      <div className="relative aspect-[3/4] md:aspect-[16/8] bg-gradient-to-br from-amber-500/5 via-stone-50/20 to-emerald-500/5 border-b border-stone-200/40 overflow-hidden">
        {/* Background Pattern and Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-70 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_65%)] pointer-events-none"></div>
        <div className="absolute top-4 left-4 z-10 pointer-events-none w-[128px] h-[128px] md:w-[160px] md:h-[160px] animate-float">
          <Image
            src={"/decoration/plant1.png"}
            alt="decoration-plant1"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <div className="flex items-center justify-center h-full space-x-2 font-mono ml-4 mr-2 relative z-10">
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
        <div
          className="absolute bottom-4 right-4 z-20 pointer-events-none w-[128px] h-[128px] md:w-[200px] md:h-[200px] animate-float"
          style={{ animationDelay: "1s" }}
        >
          <Image
            src={"/decoration/plant3.png"}
            alt="decoration-plant3"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>
      <div className="min-h-[50vh] flex items-center justify-center p-4 mb-16 animate-fade-in-up">
        <div className="max-w-4xl w-full bg-white border border-neutral-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 md:p-16 text-center hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500">
          <h1 className="text-3xl md:text-5xl font-extrabold pb-8 tracking-wider bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
            {TOP.TOP_MESSAGE}
          </h1>
          <div className="text-neutral-600 space-y-6 text-base md:text-lg leading-relaxed max-w-2xl mx-auto break-normal md:break-keep font-medium">
            <div className="space-y-2">
              {Object.entries(TOP.MESSAGE1).map(([key, value]) => (
                <p key={key} className="leading-loose">
                  {value as string}
                </p>
              ))}
            </div>
            <div className="w-12 h-[1px] bg-neutral-200 mx-auto my-6"></div>
            <div className="space-y-2">
              {Object.entries(TOP.MESSAGE2).map(([key, value]) => (
                <p key={key} className="leading-loose">
                  {value as string}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
