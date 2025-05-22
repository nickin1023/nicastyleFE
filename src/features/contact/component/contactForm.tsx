import {
  MailMessage,
  SendMailRequest,
  SendMailResponse
} from "@/server/types/entity/sendMail";
import { Button } from "@/src/components/atoms/button/Button";
import { InputForm } from "@/src/components/molecules/inputForm/InputForm";
import { TextAreaForm } from "@/src/components/molecules/textAreaForm/TextAreaForm";
import { Snackbar } from "@/src/components/organisms/snackbar/Snackbar";
import { useSnackbar } from "@/src/hooks/useSnackbar";
import { yupResolver } from "@hookform/resolvers/yup";
import { KeyboardEventHandler } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { sendMail } from "../api/sendMail";

export const ContactForm = () => {
  const { isShow, message, variant, openSnackBar } = useSnackbar();
  const MAX_NAME_LENGTH = 50;
  const MAX_SUBJECT_LENGTH = 50;
  const MAX_MAIN_LENGTH = 2500;

  const schema = object({
    name: string()
      .label("名前")
      .required("${label}は必須入力です")
      .max(MAX_NAME_LENGTH, "${label}は${max}文字以内で入力してください。"),
    address: string()
      .label("メールアドレス")
      .required("${label}は必須入力です")
      .email("${label}の形式が不正です。"),
    subject: string().max(
      MAX_SUBJECT_LENGTH,
      "${label}は${max}文字以内で入力してください。"
    ),
    main: string()
      .label("本文")
      .required("${label}は必須入力です")
      .max(MAX_MAIN_LENGTH, "${label}は${max}文字以上で入力してください。")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({ resolver: yupResolver(schema) });

  const nameWatch = watch("name");
  const subjectWatch = watch("subject");
  const mainWatch = watch("main");

  const onSubmit: SubmitHandler<MailMessage> = async (mailMessage) => {
    const mailRequest: SendMailRequest = {
      type: "Contact",
      message: {
        name: mailMessage.name,
        address: mailMessage.address,
        subject: mailMessage.subject,
        main: mailMessage.main
      }
    };
    const res: SendMailResponse = await sendMail(mailRequest);
    if (res.result === "Success") {
      openSnackBar("送信に成功しました。", "success");
      reset();
    } else {
      openSnackBar("送信に失敗しました。再度お試しください。。", "warn");
    }
  };

  const handleFormSubmit: KeyboardEventHandler = (e) => {
    if (e.target instanceof HTMLTextAreaElement) return;
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <Snackbar isShow={isShow} message={message} variant={variant} />
      <div className="relative">
        <h1>お問い合わせ</h1>
        <p>
          当サイトへのご意見やお問い合わせは下記フォームよりお願いいたします。
          <br />
        </p>
        <form onKeyDown={handleFormSubmit}>
          <InputForm
            variant={"primary"}
            formName="name"
            type="text"
            labelName="お名前 (ニックネーム)"
            required={true}
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="error-message">{errors.name?.message}</p>
          )}
          <p className="flex justify-end px-5">
            {nameWatch ? nameWatch.length : 0} / {MAX_NAME_LENGTH}
          </p>
          <InputForm
            variant={"primary"}
            formName="address"
            type="text"
            labelName="メールアドレス"
            required={true}
            {...register("address")}
          />
          {errors.address?.message && (
            <p className="error-message">{errors.address?.message}</p>
          )}
          <InputForm
            variant={"primary"}
            formName="subject"
            type="text"
            labelName="タイトル"
            required={false}
            {...register("subject")}
          />
          {errors.subject?.message && (
            <p className="error-message">{errors.subject?.message}</p>
          )}
          <p className="flex justify-end px-5">
            {subjectWatch ? subjectWatch.length : 0} / {MAX_SUBJECT_LENGTH}
          </p>
          <TextAreaForm
            labelVariant={"simple"}
            textAreaVariant={"primary"}
            formName="main"
            type="text"
            labelName="本文"
            rows={5}
            required={true}
            {...register("main")}
          />
          {errors.main?.message && (
            <p className="error-message">{errors.main?.message}</p>
          )}
          <p className="flex justify-end px-5">
            {mainWatch ? mainWatch.length : 0} / {MAX_MAIN_LENGTH}
          </p>
          <Button
            variant={"primary"}
            className="m-5"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            送信
          </Button>
        </form>
      </div>
    </>
  );
};
