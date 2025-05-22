import parse from "html-react-parser";

type htmlContentParams = {
  html: string;
};

export const HtmlContent = (params: htmlContentParams) => {
  return <article className="prose max-w-full">{parse(params.html)}</article>;
};

HtmlContent.displayName = "HtmlContent";
