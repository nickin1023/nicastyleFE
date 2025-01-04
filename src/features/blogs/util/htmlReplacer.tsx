import {
  DOMNode,
  Element,
  HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";

export const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    const node = domNode as Element;

    if (!node.attribs) return;

    if (node.name === "p") {
      return (
        <p className="text-red-500">
          {domToReact(node.children as DOMNode[], options)}
        </p>
      );
    }
    return;
  },
};
