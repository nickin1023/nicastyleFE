import { Credentials, OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { IncomingMessage, ServerResponse } from "http";

const clientSecret = process.env.GMAIL_CLIENT_SECRET;
const clientId = process.env.GMAIL_CLIENT_ID;
const redirectUrl = process.env.GMAIL_REDIRECT_URI;
const credentials: Credentials = {
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  expiry_date: Number(process.env.GMAIL_TOKEN_EXPIRE_DATE),
  access_token: process.env.GMAIL_ACCESS_TOKEN,
  token_type: process.env.GMAIL_TOKEN_TYPE,
  scope: process.env.GMAIL_TOKEN_SCOPE,
};

const send = async () => {
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
  return response.data;
};

// type AdministratorGetResponse = {
//   name: string;
// };

export default function sendMail(req: IncomingMessage, res: ServerResponse) {
  const gmailRes = send();

  console.log(gmailRes);

  const responseBody = {
    data: gmailRes,
  };

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(responseBody));
}
