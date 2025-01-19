import { HtmlContent } from "@/src/components/organisms/htmlContent/HtmlContent";
import { AdminContentParams } from "../types/blogContent";

export const AdminBlogContent = (params: AdminContentParams) => {
  const { html, isEdit, isPreview } = params;

  return (
    <>
      {isEdit && !isPreview ? (
        <>
          <div>
            <>{html}</>
          </div>
        </>
      ) : (
        <HtmlContent html={html} />
      )}
    </>
  );
};
