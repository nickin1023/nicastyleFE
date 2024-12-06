import { SendMailRequest } from "@/server/types/entity/sendMail";
import axios from "axios";

export const sendMail = async (
  sendMailRequest: SendMailRequest
): Promise<any> => {
  const res = await axios.post("/api/contact", sendMailRequest);
  return res.status;
};
