import { cn } from "@/src/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  `flex h-10 items-center justify-center gap-2 rounded-full px-4 text-textL_medium transition disabled:opacity-50 disabled:pointer-events-none transition`,
  {
    variants: {
      variant: {
        primary: `bg-gray-200 text-primaryWhite hover:opacity-75 border border-black`,
        outline: `bg-blue-500 text-red-300 border border-accent hover:opacity-75`,
        icon: `bg-transparent hover:bg-bg-gray rounded-full p-2 h-fit`,
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, children, disabled, type = "button", ...props },
    ref
  ) => {
    return (
      <button
        type={type}
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
