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

  useEffect(() => {
    if (visibleCount < images.length) {
      const delay = () => {
        switch (visibleCount) {
          case 0:
            return 1000;
          case images.length - 1:
            return 2000;
          default:
            return 450;
        }
      };
      const timeout = setTimeout(
        () => setVisibleCount(visibleCount + 1),
        delay()
      );
      return () => clearTimeout(timeout);
    }
  }, [visibleCount]);

  useEffect(() => {
    const interval = setInterval(() => setShowCaret((c) => !c), 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative aspect-[16/9] bg-gray-300">
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
      </div>
      <div>
        <span>top page message.</span>
      </div>
    </>
  );
}
