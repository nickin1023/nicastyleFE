import { HTMLInputTypeAttribute, forwardRef } from "react";
import { Input } from "../../atoms/input/Input";
import { Label } from "../../atoms/label/Label";

type InputFormProps = {
  labelVariant: "primary" | "simple" | "icon" | null | undefined;
  inputVariant: "primary" | "simple" | "icon" | null | undefined;
  formName: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  labelName: string;
  required: boolean;
};

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  (
    {
      labelVariant,
      inputVariant,
      formName,
      type,
      placeholder,
      labelName,
      required,
      ...props
    },
    ref
  ) => {
    return (
      <div className="mx-4 my-2">
        <Label variant={labelVariant} name={formName} required={required}>
          {labelName}
        </Label>
        <Input
          id={formName}
          variant={inputVariant}
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
