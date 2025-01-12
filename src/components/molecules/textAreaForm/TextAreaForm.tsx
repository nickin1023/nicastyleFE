import { HTMLInputTypeAttribute, forwardRef } from "react";
import { Label } from "../../atoms/label/Label";
import { TextArea } from "../../atoms/textArea/TextArea";

type TextAreaFormProps = {
  variant: "primary" | "outline" | "icon" | null | undefined;
  formName: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  labelName: string;
  rows?: number;
};

export const TextAreaForm = forwardRef<HTMLTextAreaElement, TextAreaFormProps>(
  (
    { variant, formName, type, placeholder, labelName, rows, ...props },
    ref
  ) => {
    return (
      <div className="m-5">
        <Label variant={variant} name={formName}>
          {labelName}
        </Label>
        <TextArea
          id={formName}
          variant={variant}
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
