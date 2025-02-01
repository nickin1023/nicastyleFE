import { HtmlContent } from "@/src/components/organisms/htmlContent/HtmlContent";
import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { AdminContentParams } from "../types/blogContent";

export const AdminBlogContent = (params: AdminContentParams) => {
  const { html, setHtml, isEdit, isPreview } = params;

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
        <HtmlContent html={html} />
      )}
    </>
  );
};
