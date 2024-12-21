import { cn } from "@/src/utils/cn";
import { cva } from "class-variance-authority";
import { HTMLInputTypeAttribute, forwardRef } from "react";
import { Input } from "../../atoms/input/Input";

const labelVariants = cva(
  `flex h-10 items-center gap-2 px-4 text-textL_medium transition disabled:opacity-50 disabled:pointer-events-none transition`,
  {
    variants: {
      variant: {
        primary: `bg-gray-200 text-primaryWhite hover:opacity-75`,
        outline: `bg-blue-500 text-red-300 border border-accent hover:opacity-75`,
        icon: `bg-transparent hover:bg-bg-gray rounded-full p-2 h-fit`,
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type InputFormProps = {
  variant: "primary" | "outline" | "icon" | null | undefined;
  formName: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  labelName: string;
};

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ variant, formName, type, placeholder, labelName, ...props }, ref) => {
    return (
      <div className="m-5">
        <label className={cn(labelVariants({ variant }))} htmlFor={formName}>
          {labelName}
        </label>
        <Input
          id={formName}
          variant={variant}
          type={type}
          placeholder={placeholder}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

InputForm.displayName = "InputForm";
