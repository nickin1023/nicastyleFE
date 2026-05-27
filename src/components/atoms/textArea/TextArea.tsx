import { cn } from "@/src/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const textAreaVariants = cva(
  `flex w-full items-center justify-center gap-2 px-4 text-base transition disabled:opacity-50 disabled:pointer-events-none transition`,
  {
    variants: {
      variant: {
        primary: `bg-white text-neutral-800 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200`,
        simple: ``,
        icon: `bg-transparent hover:bg-bg-gray rounded-full p-2 h-fit`
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaVariants> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant, children, disabled, rows, ...props }, ref) => {
    return (
      <textarea
        className={cn(textAreaVariants({ variant, className }))}
        ref={ref}
        disabled={disabled}
        {...props}
        rows={rows}
      >
        {children}
      </textarea>
    );
  }
);

TextArea.displayName = "TextArea";
