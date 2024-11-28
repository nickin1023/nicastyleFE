import { SendMailRequest } from "@/server/types/entity/sendMail";
import axios from "axios";

export const sendMail = async (
  sendMailRequest: SendMailRequest
): Promise<any> => {
  const res = await axios.post("/api/send-mail", sendMailRequest);
  return res.status;
};
