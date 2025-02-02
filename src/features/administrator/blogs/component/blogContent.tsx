import { HtmlContent } from "@/src/components/organisms/htmlContent/HtmlContent";
import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { AdminContentParams } from "../types/blogContent";

export const AdminBlogContent = (params: AdminContentParams) => {
  const { html, setHtml, title, setTitle, isEdit, isPreview } = params;

  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  const monacoOptions = {
    readOnly: false,
    minimap: { enabled: false },
    scrollbar: {
      alwaysConsumeMouseWheel: false,
    },
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
        <>
          <p>title: {title}</p>
          <HtmlContent html={html} />
        </>
      )}
    </>
  );
};
