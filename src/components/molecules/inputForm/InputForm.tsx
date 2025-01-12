import { HTMLInputTypeAttribute, forwardRef } from "react";
import { Input } from "../../atoms/input/Input";
import { Label } from "../../atoms/label/Label";

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
        <Label variant={variant} name={formName}>
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
