import {
  SendMailRequest,
  SendMailResponse,
} from "@/server/types/entity/sendMail";
import axios from "axios";

export const sendMail = async (
  sendMailRequest: SendMailRequest
): Promise<SendMailResponse> => {
  const res = await axios.post("/api/contact", sendMailRequest);
  return res.data;
};
