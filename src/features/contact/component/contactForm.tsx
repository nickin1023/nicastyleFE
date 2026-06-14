import {
  MailMessage,
  SendMailRequest,
  SendMailResponse
} from "@/server/types/entity/sendMail";
import { Button } from "@/src/components/atoms/button/Button";
import { InputForm } from "@/src/components/molecules/inputForm/InputForm";
import { TextAreaForm } from "@/src/components/molecules/textAreaForm/TextAreaForm";
import { Snackbar } from "@/src/components/organisms/snackbar/Snackbar";
import { CONTACT } from "@/src/consts/strings";
import { useSnackbar } from "@/src/hooks/useSnackbar";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
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
      <div className="relative max-w-3xl mx-auto px-4 md:px-0 pb-16 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center pt-12 pb-6 text-neutral-900">
          お問い合わせ
        </h1>
        <div className="bg-white border border-neutral-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] p-6 md:p-10 my-6">
          <div className="text-neutral-500 mb-8 space-y-3 text-sm md:text-base leading-relaxed border-b border-neutral-100 pb-6">
            <p>{CONTACT.DESCRIPTION1}</p>
            <p>
              <span>{CONTACT.DESCRIPTION2}</span>
              <span>{CONTACT.DESCRIPTION3}</span>
              <Link href="/privacy" className="text-amber-600 hover:text-amber-700 hover:underline transition-colors font-semibold">
                {CONTACT.DESCRIPTION4}
              </Link>
              <span>{CONTACT.DESCRIPTION5}</span>
            </p>
          </div>
          <form onKeyDown={handleFormSubmit} className="space-y-6">
            <div>
              <InputForm
                labelVariant={"simple"}
                inputVariant={"primary"}
                formName="name"
                type="text"
                labelName="お名前 (ニックネーム)"
                required={true}
                {...register("name")}
              />
              {errors.name?.message && (
                <p className="error-message mx-4 text-sm text-red-500 font-medium mt-1">{errors.name?.message}</p>
              )}
              <p className="flex justify-end px-5 text-xs text-neutral-400 mt-1">
                {nameWatch ? nameWatch.length : 0} / {MAX_NAME_LENGTH}
              </p>
            </div>

            <div>
              <InputForm
                labelVariant={"simple"}
                inputVariant={"primary"}
                formName="address"
                type="text"
                labelName="メールアドレス"
                required={true}
                {...register("address")}
              />
              {errors.address?.message && (
                <p className="error-message mx-4 text-sm text-red-500 font-medium mt-1">{errors.address?.message}</p>
              )}
            </div>

            <div>
              <InputForm
                labelVariant={"simple"}
                inputVariant={"primary"}
                formName="subject"
                type="text"
                labelName="タイトル"
                required={false}
                {...register("subject")}
              />
              {errors.subject?.message && (
                <p className="error-message mx-4 text-sm text-red-500 font-medium mt-1">{errors.subject?.message}</p>
              )}
              <p className="flex justify-end px-5 text-xs text-neutral-400 mt-1">
                {subjectWatch ? subjectWatch.length : 0} / {MAX_SUBJECT_LENGTH}
              </p>
            </div>

            <div>
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
                <p className="error-message mx-4 text-sm text-red-500 font-medium mt-1">{errors.main?.message}</p>
              )}
              <p className="flex justify-end px-5 text-xs text-neutral-400 mt-1">
                {mainWatch ? mainWatch.length : 0} / {MAX_MAIN_LENGTH}
              </p>
            </div>

            <Button
              variant={"simple"}
              className="h-11 px-8 rounded-xl bg-amber-500 text-white font-semibold shadow-md hover:bg-amber-600 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 mx-4 mt-6"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              送信する
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
