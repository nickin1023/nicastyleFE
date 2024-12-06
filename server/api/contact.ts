import { Request } from "express";
import { Credentials, OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { envMap } from "..";
import { SendMailResponse } from "../types/entity/sendMail";

const send = async () => {
  const clientSecret = envMap.gmail.client.clientSecret;
  const clientId = envMap.gmail.client.clientId;
  const redirectUrl = envMap.gmail.client.redirectUri;
  const credentials: Credentials = envMap.gmail.token;

  //認証
  const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);
  oauth2Client.credentials = credentials;

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const makeBody = (params: any) => {
    params.subject = Buffer.from(params.subject).toString("base64"); //日本語対応

    const str = [
      `Content-Type: text/plain; charset=\"UTF-8\"\n`,
      `MIME-Version: 1.0\n`,
      `Content-Transfer-Encoding: 7bit\n`,
      `to: ${params.to} \n`,
      `from: ${params.from} \n`,
      `subject: =?UTF-8?B?${params.subject}?= \n\n`,
      params.message,
    ].join("");
    return Buffer.from(str)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const messageBody = `テスト body`;

  const raw = makeBody({
    to: "nickin.entre@gmail.com",
    from: "nickin.entre@gmail.com",
    subject: "test",
    message: messageBody,
  });

  //API経由でシートにアクセス
  const response = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: raw,
    },
  });

  //結果を表示
  return response;
};

export const sendMail = async (req: Request) => {
  var res: SendMailResponse;
  try {
    const response = await send();

    if (response.status != 200) {
      console.warn("Gmail API error: ", response.data);
      res = { result: "Failure" };
      return res;
    }
  } catch (e) {
    console.warn("Gmail API error: ", e);
    res = { result: "Failure" };
    return res;
  }

  res = { result: "Success" };
  return res;
};
