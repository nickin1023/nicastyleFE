import parse, { Element, HTMLReactParserOptions } from "html-react-parser";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    const node = domNode as Element;

    if (!node.attribs) return;

    return;
  },
};

type htmlContentParams = {
  html: string;
};

export const HtmlContent = (params: htmlContentParams) => {
  return <>{parse(params.html, options)}</>;
};

HtmlContent.displayName = "HtmlContent";
