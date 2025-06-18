import { cn } from "@/src/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Badge } from "../badge/Badge";

const labelVariants = cva(`flex h-10 items-center gap-2`, {
  variants: {
    variant: {
      primary: `rounded-10 underline underline-offset-4 bg-amber-300 px-4`,
      simple: `font-bold`,
      icon: `bg-transparent hover:bg-gray rounded-full p-2 h-fit`
    }
  },
  defaultVariants: {
    variant: "primary"
  }
});

interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  variant: "primary" | "simple" | "icon" | null | undefined;
  name: string;
  required: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, children, name, required, ...props }, ref) => {
    return (
      <label
        className={cn(labelVariants({ variant, className }))}
        htmlFor={name}
        ref={ref}
        {...props}
      >
        {children}
        {required && <Badge variant={"red"}>必須</Badge>}
      </label>
    );
  }
);

Label.displayName = "Label";
