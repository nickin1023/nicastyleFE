import { cn } from "@/src/utils/cn";
import { cva } from "class-variance-authority";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";
import { AdminContentParams } from "../types/blogContent";

const blogVariants = cva(
  `flex items-center justify-center gap-2 rounded-full text-textL_medium transition disabled:opacity-50 disabled:pointer-events-none transition`,
  {
    variants: {
      variant: {
        primary: `text-primaryWhite hover:opacity-75 border border-black`,
        outline: `bg-blue-500 text-red-300 border border-accent hover:opacity-75`,
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export const AdminBlogContent = (params: AdminContentParams) => {
  return <>{parse(params.html, options)}</>;
};

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    const node = domNode as Element;

    if (!node.attribs) return;

    if (node.name === "p") {
      return (
        <p className={cn(blogVariants({ variant: "primary" }))}>
          {domToReact(node.children as DOMNode[], options)}
        </p>
      );
    }
    return;
  },
};
