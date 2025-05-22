import { HTMLInputTypeAttribute, forwardRef } from "react";
import { Label } from "../../atoms/label/Label";
import { TextArea } from "../../atoms/textArea/TextArea";

type TextAreaFormProps = {
  labelVariant: "primary" | "simple" | "icon" | null | undefined;
  textAreaVariant: "primary" | "simple" | "icon" | null | undefined;
  formName: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  labelName: string;
  rows?: number;
  required: boolean;
};

export const TextAreaForm = forwardRef<HTMLTextAreaElement, TextAreaFormProps>(
  (
    {
      labelVariant,
      textAreaVariant,
      formName,
      placeholder,
      labelName,
      rows,
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
        <TextArea
          id={formName}
          variant={textAreaVariant}
          rows={rows}
          placeholder={placeholder}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

TextAreaForm.displayName = "TextAreaForm";
