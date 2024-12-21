import {
  MailMessage,
  SendMailRequest,
  SendMailResponse,
} from "@/server/types/entity/sendMail";
import { Button } from "@/src/components/atoms/button/Button";
import { InputForm } from "@/src/components/molecules/inputForm/InputForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendMail } from "../../api/sendMail";

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    console.log(res);
  };

  return (
    <>
      <h1>お問い合わせ</h1>
      <p>
        当サイトへのご意見やお問い合わせは下記フォームよりお願いいたします。
        <br />
      </p>
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
    </>
  );
};
