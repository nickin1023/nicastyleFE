import {
  MailMessage,
  SendMailRequest,
  SendMailResponse,
} from "@/server/types/entity/sendMail";
import { Button } from "@/src/components/atoms/button/Button";
import { InputForm } from "@/src/components/molecules/inputForm/InputForm";
import { TextAreaForm } from "@/src/components/molecules/textAreaForm/TextAreaForm";
import { Snackbar } from "@/src/components/organisms/snackbar/Snackbar";
import { useSnackbar } from "@/src/hooks/useSnackbar";
import { KeyboardEventHandler } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendMail } from "../api/sendMail";

export const ContactForm = () => {
  const { isShow, message, variant, openSnackBar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MailMessage>();

  const onSubmit: SubmitHandler<MailMessage> = async (mailMessage) => {
    const mailRequest: SendMailRequest = {
      type: "Contact",
      message: {
        name: mailMessage.name,
        address: mailMessage.address,
        subject: mailMessage.subject,
        main: mailMessage.main,
      },
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
            {...register("name", {
              required: "お名前 (ニックネーム) を入力してください",
            })}
          />
          {errors.name?.message && (
            <p className="error-message">{errors.name?.message}</p>
          )}
          <InputForm
            variant={"primary"}
            formName="address"
            type="text"
            labelName="メールアドレス"
            required={true}
            {...register("address", {
              required: "アドレスを入力してください",
            })}
          />
          <InputForm
            variant={"primary"}
            formName="subject"
            type="text"
            labelName="タイトル"
            required={false}
            {...register("subject")}
          />
          <TextAreaForm
            variant={"primary"}
            formName="main"
            type="text"
            labelName="本文"
            rows={5}
            required={true}
            {...register("main", {
              required: "本文を入力してください",
            })}
          />
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
