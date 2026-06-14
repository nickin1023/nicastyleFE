import { cn } from "@/src/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const inputVariants = cva(
  `flex w-full h-10 items-center justify-center gap-2 px-4 text-textL_medium transition disabled:opacity-50 disabled:pointer-events-none transition`,
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

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant, children, disabled, type = "input", ...props },
    ref
  ) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </input>
    );
  }
);

Input.displayName = "Input";
