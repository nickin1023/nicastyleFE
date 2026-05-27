import Link from "next/link";

export default function Custom500() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 animate-fade-in-up">
      <div className="max-w-md w-full bg-white border border-neutral-100 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.02)] p-8 md:p-12 text-center">
        {/* Server Crash Icon */}
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.5em"
            height="2.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-neutral-800 mb-3">
          500 - サーバーエラー
        </h2>
        <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-8">
          サーバー内部でエラーが発生しました。時間をおいてからリロードいただくか、トップページにお戻りください。
        </p>
        <Link
          href="/"
          className="h-11 px-8 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 w-full shadow-md shadow-amber-500/10 active:scale-98"
        >
          トップページへ戻る
        </Link>
      </div>
    </div>
  );
}
