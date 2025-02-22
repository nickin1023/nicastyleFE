import { cn } from "@/src/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const labelVariants = cva(
  `flex h-10 items-center gap-2 px-4 text-textL_medium transition disabled:opacity-50 disabled:pointer-events-none transition`,
  {
    variants: {
      variant: {
        primary: `bg-gray-200 text-primaryWhite hover:opacity-75`,
        outline: `bg-blue-500 text-red-300 border border-accent hover:opacity-75`,
        icon: `bg-transparent hover:bg-bg-gray rounded-full p-2 h-fit`
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);

interface LabelProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof labelVariants> {
  variant: "primary" | "outline" | "icon" | null | undefined;
  name: string;
  required: boolean;
}

export const Label = React.forwardRef<HTMLElement, LabelProps>(
  ({ className, variant, children, name, required, ...props }) => {
    return (
      <label
        className={cn(labelVariants({ variant, className }))}
        htmlFor={name}
        {...props}
      >
        {children}
        {required && <span>必須</span>}
      </label>
    );
  }
);

Label.displayName = "Label";
