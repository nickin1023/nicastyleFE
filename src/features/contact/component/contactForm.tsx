import {
  MailMessage,
  SendMailRequest,
  SendMailResponse,
} from "@/server/types/entity/sendMail";
import { Button } from "@/src/components/atoms/button/Button";
import { InputForm } from "@/src/components/molecules/inputForm/InputForm";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendMail } from "../../api/sendMail";

export const ContactForm = () => {
  const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MailMessage>();

  const onClickSend: SubmitHandler<MailMessage> = async (mailMessage) => {
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
      setSnackbarMessage("送信に成功しました。");
      reset();
    } else {
      setSnackbarMessage("送信に失敗しました。再度お試しください。");
    }

    setIsSnackbarVisible(true);
    setTimeout(() => {
      setIsSnackbarVisible(false);
    }, 3000);
  };

  return (
    <div className="relative">
      <h1>お問い合わせ</h1>
      <p>
        当サイトへのご意見やお問い合わせは下記フォームよりお願いいたします。
        <br />
      </p>
      {isSnackbarVisible && (
        <div className="absolute top-0 left-0 right-0 bg-blue-500 text-black px-4 py-3 z-10">
          <p>{snackbarMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit(onClickSend)}>
        <InputForm
          variant={"primary"}
          formName="name"
          type="text"
          placeholder="name"
          labelName="お名前"
          {...register("name", {
            required: "お名前を入力してください",
          })}
        />
        {errors.name?.message && (
          <p className="error-message">{errors.name?.message}</p>
        )}
        <InputForm
          variant={"primary"}
          formName="address"
          type="text"
          placeholder="address"
          labelName="メールアドレス"
          {...register("address", {
            required: "アドレスを入力してください",
          })}
        />
        <InputForm
          variant={"primary"}
          formName="subject"
          type="text"
          placeholder="subject"
          labelName="タイトル"
          {...register("subject")}
        />
        <InputForm
          variant={"primary"}
          formName="main"
          type="text"
          placeholder="main"
          labelName="本文"
          {...register("main", {
            required: "本文を入力してください",
          })}
        />
        <Button variant={"primary"} className="m-5" type="submit">
          送信
        </Button>
      </form>
    </div>
  );
};
