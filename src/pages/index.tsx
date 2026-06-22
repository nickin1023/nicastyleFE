import { TOP } from "@/src/consts/strings";
import Link from "next/link";
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
      </div>
      <div className="min-h-[40vh] flex items-center justify-center p-4 my-8 md:my-16 animate-fade-in-up">
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

      {/* Service Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-16 animate-fade-in-up">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-neutral-900 mb-2">
          Service
        </h2>
        <p className="text-center text-neutral-500 text-sm md:text-base mb-12">
          提供サービス一覧
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-neutral-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6 text-amber-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-3">
              広告獲得最適化
            </h3>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed flex-grow">
              Google、Yahoo、Meta（Facebook/Instagram）等の主要広告媒体に対応。リソースや予算が限られた状況下でも、無駄な露出を排除し、質の高い見込み顧客からのCVを最大化する広告戦略を設計・運用代行します。
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white border border-neutral-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 text-emerald-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-3">
              LINE CRM構築・運用
            </h3>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed flex-grow">
              広告で集めた友だちを顧客へ育てるCRMの設計。ステップ配信やリッチメニューの設計、回答フォームの導入、Lステップ等の拡張ツール活用により、高い開封率・クリック率を活かした成約率（LTV）向上を実現します。
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white border border-neutral-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center mb-6 text-cyan-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-3">
              全体最適データ分析
            </h3>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed flex-grow">
              広告をクリックしたユーザーが、LINE内でどのようなアクションを取り、最終的に成約へ至ったかを一元的に可視化・分析。ファネル全体の中でのボトルネックを特定し、持続的にROIを高める施策を打ち続けます。
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-24 animate-fade-in-up">
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-8 md:p-12 text-center shadow-xl border border-neutral-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08)_0%,transparent_50%)] pointer-events-none"></div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            「広告 × LINE公式アカウント」統合マーケティング無料診断
          </h2>
          <p className="text-neutral-300 text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            現在、月3社様限定で「無料の集客・CRM統合診断」を実施しています。現在の広告運用の課題や、LINE公式アカウントの構築設計について、具体的な改善案をご提示します。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-amber-500 text-white font-bold shadow-lg hover:bg-amber-600 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200 gap-2 cursor-pointer"
          >
            無料で相談してみる
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
