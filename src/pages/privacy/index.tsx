import { PRIVACY } from "@/src/consts/strings";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0 pb-16 animate-fade-in-up">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center pt-12 pb-6 text-neutral-900">
        プライバシーポリシー
      </h1>

      <div className="bg-white border border-neutral-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] p-6 md:p-10 my-6">
        <div className="mx-2">
          <h2 className="text-xl md:text-2xl font-extrabold pb-3 border-b border-neutral-100 text-neutral-800 mb-6">
            1. 個人情報の利用目的と開示について
          </h2>

          <div className="space-y-4 text-neutral-600 leading-loose text-base md:text-lg">
            {Object.entries(PRIVACY).map(([key, value]) =>
              typeof value === "string" ? (
                <p key={key} className="py-1">
                  {value as string}
                </p>
              ) : (
                <ul key={key} className="list-disc pl-6 space-y-1 font-medium">
                  {Object.entries(value).map(([k, v]) => (
                    <li key={k} className="py-0.5">{v}</li>
                  ))}
                </ul>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
