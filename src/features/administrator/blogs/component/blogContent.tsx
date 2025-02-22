import { BlogContent } from "@/src/features/blogs/component/blogContent";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useRef } from "react";
import { AdminContentParams } from "../types/blogContent";

export const AdminBlogContent = (params: AdminContentParams) => {
  const {
    html,
    setHtml,
    title,
    setTitle,
    isEdit,
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
    wordWrap: "on" as "on" | "off" | "wordWrapColumn" | "bounded"
  };

  return (
    <>
      {isEdit && !isPreview ? (
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
          <p>contents</p>
          <div className="border border-black">
            <Editor
              height="90vh"
              defaultLanguage="html"
              defaultValue={html}
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
        <BlogContent
          title={title}
          html={html}
          published_at={publishedAt}
          updated_at={updatedAt}
        />
      )}
    </>
  );
};
