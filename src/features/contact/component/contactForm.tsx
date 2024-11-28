import { SendMailRequest } from "@/server/types/entity/sendMail";
import { Button } from "@/src/components/atoms/button/Button";
import { sendMail } from "../../api/sendMail";

export const ContactForm = () => {
  const onClickSend = async () => {
    const mailRequest: SendMailRequest = {
      type: "Contact",
      message: {
        name: "name",
        address: "address",
        subject: "subject",
        main: "main",
      },
    };
    const res = await sendMail(mailRequest);
    console.log(res);
  };

  return (
    <>
      <Button variant={"primary"} onClick={onClickSend}>
        button
      </Button>
    </>
  );
};
