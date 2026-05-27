import { ArticleContent } from "@/src/features/articles/component/articleContent";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useRef } from "react";
import { AdminContentParams } from "../types/articleContent";

export const AdminArticleContent = (params: AdminContentParams) => {
  const {
    html,
    setHtml,
    title,
    setTitle,
    featureImageUrl,
    setFeatureImageUrl,
    isPreview,
    publishedAt,
    updatedAt
  } = params;

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  const monacoOptions = {
    readOnly: false,
    minimap: { enabled: false },
    scrollbar: {
      alwaysConsumeMouseWheel: false
    },
    wordWrap: "on" as "on" | "off" | "wordWrapColumn" | "bounded",
    fontFamily: "'MS ゴシック'"
  };

  return (
    <>
      {!isPreview ? (
        <>
          <div className="py-2">
            <p>title</p>
            <input
              className="border border-black w-full"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="py-2">
            <p>featureImageUrl</p>
            <input
              className="border border-black w-full"
              type="text"
              value={featureImageUrl}
              onChange={(e) => setFeatureImageUrl(e.target.value)}
            />
          </div>
          <p>contents</p>
          <div className="border border-black">
            <Editor
              height="90vh"
              defaultLanguage="html"
              value={html}
              onMount={handleEditorDidMount}
              onChange={(newValue) => {
                setHtml(newValue!);
              }}
              options={monacoOptions}
              theme="light"
            />
          </div>
        </>
      ) : (
        <ArticleContent
          title={title}
          html={html}
          featureImageUrl={featureImageUrl}
          published_at={publishedAt}
          updated_at={updatedAt}
        />
      )}
    </>
  );
};
