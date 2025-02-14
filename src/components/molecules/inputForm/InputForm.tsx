import { HTMLInputTypeAttribute, forwardRef } from "react";
import { Input } from "../../atoms/input/Input";
import { Label } from "../../atoms/label/Label";

type InputFormProps = {
  variant: "primary" | "outline" | "icon" | null | undefined;
  formName: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  labelName: string;
  required: boolean;
};

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  (
    { variant, formName, type, placeholder, labelName, required, ...props },
    ref
  ) => {
    return (
      <div className="mx-5 my-1">
        <Label variant={variant} name={formName} required={required}>
          {labelName}
        </Label>
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
