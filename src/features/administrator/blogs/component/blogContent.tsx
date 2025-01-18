import { Button } from "@/src/components/atoms/button/Button";
import { Dialog } from "@/src/components/organisms/dialog/Dialog";
import { cva } from "class-variance-authority";
import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import { useState } from "react";
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

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    const node = domNode as Element;

    if (!node.attribs) return;

    return;
  },
};

export const AdminBlogContent = (params: AdminContentParams) => {
  const { html, isEdit } = params;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      {isEdit ? (
        <>
          <div>
            <>{html}</>
            <Button variant={"primary"} onClick={() => setIsDialogOpen(true)}>
              更新
            </Button>
          </div>
          {isDialogOpen && (
            <Dialog
              variant={"primary"}
              title="更新"
              content="更新しても問題ないですか?"
              isOpen={isDialogOpen}
              setIsOpen={setIsDialogOpen}
              onClickOk={() => setIsDialogOpen(false)}
            />
          )}
        </>
      ) : (
        <>{parse(html, options)}</>
      )}
    </>
  );
};
