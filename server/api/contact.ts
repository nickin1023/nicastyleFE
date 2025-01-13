import { Request } from "express";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { envMap } from "..";
import { SendMailRequest, SendMailResponse } from "../types/entity/sendMail";

// OAuth2Clientの初期化
const getOAuth2Client = () => {
  const { client, token } = envMap.gmail;
  const oauth2Client = new OAuth2Client(
    client.clientId,
    client.clientSecret,
    client.redirectUri
  );
  oauth2Client.credentials = token;
  return oauth2Client;
};

const send = async (req: SendMailRequest) => {
  const oauth2Client = getOAuth2Client();
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const makeBody = (params: any) => {
    params.subject = Buffer.from(params.subject).toString("base64"); //日本語対応

    const str = [
      `Content-Type: text/plain; charset=\"UTF-8\"\n`,
      `MIME-Version: 1.0\n`,
      `Content-Transfer-Encoding: 7bit\n`,
      `to: ${params.to} \n`,
      `subject: =?UTF-8?B?${params.subject}?= \n\n`,
      params.message,
    ].join("");
    return Buffer.from(str)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const messageBody = () => {
    if (req.type === "Contact") {
      return `${req.message.name}さんより お問い合わせ \nメールアドレス: ${
        req.message.address ? req.message.address : "アドレス記載なし"
      }\nタイトル: ${req.message.subject}\n本文\n ${req.message.main}`;
    } else {
      return `記事タイトル: ${req.message.commentInfo?.title}\nURL: http://localhost:${envMap.PORT}/blogs/${req.message.commentInfo?.id} \n本文\n${req.message.main}`;
    }
  };

  //API経由でシートにアクセス
  const response = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: makeBody({
        to: envMap.MAIL_ADDRESS,
        subject: req.type,
        message: messageBody(),
      }),
    },
  });

  //結果を表示
  return response;
};

export const sendMail = async (req: Request) => {
  var res: SendMailResponse;
  try {
    const response = await send(req.body);

    if (response.status != 200) {
      throw new Error(`Gmail API error: ${JSON.stringify(response.data)}`);
    }
  } catch (e) {
    console.warn("Gmail API error: ", e);
    res = { result: "Failure" };
    return res;
  }

  res = { result: "Success" };
  return res;
};
