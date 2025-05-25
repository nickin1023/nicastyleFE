import { PRIVACY } from "@/src/consts/strings";

export default function PrivacyPage() {
  return (
    <div className="mx-3 md:mx-auto md:max-w-6xl pb-4">
      <h1 className="text-3xl font-bold text-center pt-8 pb-4">
        プライバシーポリシー
      </h1>

      <div className="bg-white rounded-lg my-4 py-4">
        <div className="mx-4">
          <h2 className="text-2xl font-bold py-4">
            1. 個人情報の利用目的と開示について
          </h2>

          <div className="mx-4">
            {Object.entries(PRIVACY).map(([key, value]) =>
              typeof value === "string" ? (
                <p key={key} className="py-2">
                  {value as string}
                </p>
              ) : (
                <ul key={key} className="list-disc ml-6">
                  {Object.entries(value).map(([k, v]) => (
                    <li key={k}>{v}</li>
                  ))}
                </ul>
              )
            )}
          </div>
          <h2 className="text-2xl font-bold py-4">2. Cookieについて</h2>
        </div>
      </div>
    </div>
  );
}
