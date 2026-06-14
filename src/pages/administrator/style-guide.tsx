import { Breadcrumb } from "@/src/components/organisms/breadcrumb/Breadcrumb";
import { useState } from "react";

type CodeItemProps = {
  title: string;
  description: string;
  htmlCode: string;
  renderElement: React.ReactNode;
};

const CodeItem = ({ title, description, htmlCode, renderElement }: CodeItemProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-neutral-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] p-6 md:p-8 mb-8">
      <h3 className="text-xl font-bold text-neutral-800 mb-2">{title}</h3>
      <p className="text-neutral-500 text-sm mb-6">{description}</p>

      {/* Preview Section */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">プレビュー</h4>
        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/30 prose max-w-full">
          {renderElement}
        </div>
      </div>

      {/* Code Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">HTMLコード</h4>
          <button
            onClick={handleCopy}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200 ${
              copied
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100 active:scale-95"
            }`}
          >
            {copied ? "コピーしました！" : "コードをコピー"}
          </button>
        </div>
        <pre className="text-xs font-mono bg-neutral-900 text-neutral-100 p-4 rounded-xl overflow-x-auto leading-relaxed border border-neutral-800 shadow-inner">
          <code>{htmlCode}</code>
        </pre>
      </div>
    </div>
  );
};

export default function StyleGuidePage() {
  return (
    <>
      <Breadcrumb />
      <div className="max-w-4xl mx-auto px-4 pb-16 animate-fade-in-up">
        <div className="text-center pt-8 pb-10 border-b border-neutral-100 mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-4">
            スタイルガイド
          </h1>
          <p className="text-neutral-500 text-base max-w-xl mx-auto leading-relaxed">
            ブログのCMS等で記事を直接HTML/CSSで執筆する際にコピペして利用できる、モダンな装飾素材集です。
          </p>
        </div>

        <div className="space-y-8">
          {/* 1. マーカー */}
          <CodeItem
            title="1. 蛍光ペン風マーカー"
            description="文字の下半分に半透明のマーカー線を引き、テキストを強調します。"
            htmlCode={`<span class="marker-yellow">ここに強調テキスト（黄色）</span>
<span class="marker-pink">ここに強調テキスト（ピンク）</span>
<span class="marker-blue">ここに強調テキスト（水色）</span>`}
            renderElement={
              <p className="m-0 leading-loose">
                IT技術を活用して、私たちの<span className="marker-yellow">世界を進める</span>ことを目標としています。
                特に<span className="marker-pink">ReactやTypeScript</span>の情報を発信し、誰かにとっての<span className="marker-blue">価値を創造</span>します。
              </p>
            }
          />

          {/* 2. コールアウトボックス */}
          <CodeItem
            title="2. コールアウトボックス (4系統)"
            description="注意点や参考情報などを目立たせて枠線付きのカードで表示します。旧 point-box もこの系統にアップデートされています。"
            htmlCode={`<div class="box-info">
  <strong>補足情報:</strong> ここに詳細なテキストや参考のURLなどを記述します。
</div>

<div class="box-warning">
  <strong>注意:</strong> ここに作業上の注意点や設定漏れなどのリスクを記述します。
</div>

<div class="box-error">
  <strong>重要:</strong> ここにエラー解決手順や必須要件などを赤色で強調して記述します。
</div>

<div class="box-success">
  <strong>メリット / ポイント:</strong> ここにまとめやメリットなど、ポジティブな内容を記述します。
</div>`}
            renderElement={
              <div className="space-y-4">
                <div className="box-info m-0">
                  <strong>補足情報:</strong> NEXT_PUBLIC_BASE_URL は環境に合わせて設定してください。
                </div>
                <div className="box-warning m-0">
                  <strong>注意:</strong> ポート番号が衝突すると、ローカルサーバーが起動しない場合があります。
                </div>
                <div className="box-error m-0">
                  <strong>重要:</strong> envファイルの記述に不足があると500エラーの原因になります。
                </div>
                <div className="box-success m-0">
                  <strong>ポイント:</strong> 新しいデザインはTailwindCSSを採用しており、極めて軽量です。
                </div>
              </div>
            }
          />

          {/* 3. ステップリスト */}
          <CodeItem
            title="3. タイムライン風ステップリスト"
            description="olタグに対して適用することで、自動的に丸数字が連番で付与され、項目間が縦線で連結される手順用のリストです。"
            htmlCode={`<ol class="step-list">
  <li>
    <strong>アカウントを作成する</strong>
    <p>まずは公式サイトにアクセスし、メールアドレスを入力して新規登録を行います。</p>
  </li>
  <li>
    <strong>環境変数を設定する</strong>
    <p>プロジェクトのルートディレクトリに.envファイルを作成し、必要な設定項目を記述します。</p>
  </li>
  <li>
    <strong>ローカルサーバーを起動する</strong>
    <p>「npm run dev」を実行して、localhost:3000 に接続します。</p>
  </li>
</ol>`}
            renderElement={
              <ol className="step-list m-0">
                <li className="m-0">
                  <strong className="text-neutral-800">アカウントを作成する</strong>
                  <p className="text-sm text-neutral-500 m-0 mt-1">まずは公式サイトにアクセスし、メールアドレスを入力して新規登録を行います。</p>
                </li>
                <li className="m-0">
                  <strong className="text-neutral-800">環境変数を設定する</strong>
                  <p className="text-sm text-neutral-500 m-0 mt-1">プロジェクトのルートディレクトリに.envファイルを作成し、必要な設定項目を記述します。</p>
                </li>
                <li className="m-0">
                  <strong className="text-neutral-800">ローカルサーバーを起動する</strong>
                  <p className="text-sm text-neutral-500 m-0 mt-1">「npm run dev」を実行して、localhost:3000 に接続します。</p>
                </li>
              </ol>
            }
          />

          {/* 4. インラインバッジ */}
          <CodeItem
            title="4. モダンインラインバッジ"
            description="技術スタックやキーワードなどをテキストの途中でバッジとして綺麗に並べます。"
            htmlCode={`<span class="inline-badge inline-badge-blue">Next.js</span>
<span class="inline-badge inline-badge-green">React</span>
<span class="inline-badge inline-badge-neutral">TypeScript</span>`}
            renderElement={
              <p className="m-0">
                使用技術：
                <span className="inline-badge inline-badge-blue">Next.js</span>
                <span className="inline-badge inline-badge-green">React</span>
                <span className="inline-badge inline-badge-neutral">TypeScript</span>
              </p>
            }
          />

          {/* 5. リンク用ブログカード */}
          <CodeItem
            title="5. ブログリンクカード"
            description="記事への内部リンクや外部リンクを、画像と概要付きのモダンなカードスタイルで表示します。ホバー時にスムーズに浮き上がるインタラクションが自動で適用されます。"
            htmlCode={`<a href="/articles" class="blog-link-card">
  <!-- サムネイル画像部 -->
  <div class="card-image">
    <img src="/noimage.png" alt="" style="object-fit: cover; width: 100%; height: 100%; position: absolute;" />
  </div>
  <!-- 説明テキスト部 -->
  <div class="card-content">
    <div class="card-title">モダンなデザインシステムの導入方法</div>
    <div class="card-desc">今回はnicastyleに導入した新しいデザインシステムの詳細と、ブログ記事を執筆する上で活用できるユーティリティクラスの活用方法について解説します。</div>
  </div>
</a>`}
            renderElement={
              <a href="#" className="blog-link-card m-0" onClick={(e) => e.preventDefault()}>
                <div className="card-image">
                  <img
                    src="/noimage.png"
                    alt=""
                    style={{ objectFit: "cover", width: "100%", height: "100%", position: "absolute" }}
                  />
                </div>
                <div className="card-content">
                  <div className="card-title">モダンなデザインシステムの導入方法</div>
                  <div className="card-desc">今回はnicastyleに導入した新しいデザインシステムの詳細と、ブログ記事を執筆する上で活用できるユーティリティクラスの活用方法について解説します。</div>
                </div>
              </a>
            }
          />

          {/* 6. 楽天ボタン */}
          <CodeItem
            title="6. 楽天市場リンクボタン"
            description="記事内に埋め込むことができる、アフィリエイトなどのための楽天市場風デザインのボタンです。"
            htmlCode={`<a href="https://rakuten.co.jp" class="rakuten-button" target="_blank" rel="noopener noreferrer">
  <div>楽天市場で見る</div>
</a>`}
            renderElement={
              <a href="#" className="rakuten-button m-0" onClick={(e) => e.preventDefault()}>
                <div>楽天市場で見る</div>
              </a>
            }
          />
        </div>
      </div>
    </>
  );
}
