import { cn } from "@/src/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  `flex h-10 items-center justify-center gap-2  mx-1 px-4`,
  {
    variants: {
      variant: {
        primary: `text-gray-700 rounded-10 bg-neumorphismBg shadow-neumorphism transition-box-shadow duration-500 hover:shadow-neumorphismInset`,
        simple: ``,
        icon: `text-gray-700 rounded-10 bg-neumorphismWhiteBg shadow-neumorphismWhite transition-box-shadow duration-500 hover:shadow-neumorphismWhiteInset`
      }
    },
    defaultVariants: {
      variant: "primary"
    }
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
