import { SetAdminPostParams } from "@/server/types/entity/adminPost";
import axios from "axios";
import jwt from "jsonwebtoken";
import { envMap } from "../..";

const generateToken = () => {
  const key = envMap.ghost.adminApiKey;
  const [id, secret] = key.split(":");

  // Create the token (including decoding secret)
  return jwt.sign({}, Buffer.from(secret, "hex"), {
    keyid: id,
    algorithm: "HS256",
    expiresIn: "5m",
    audience: `/admin/`,
  });
};

export const requestGet = async <T = any>(
  path: string,
  params?: Map<string, string>
): Promise<T> => {
  var url: string;

  if (params) {
    const query = new URLSearchParams(Object.fromEntries(params));
    url = `${envMap.ghost.host}/ghost/api/admin/${path}?${query}`;
  } else {
    url = `${envMap.ghost.host}/ghost/api/admin/${path}`;
  }

  const headers = { Authorization: `Ghost ${generateToken()}` };

  return await axios
    .get(`${url}`, { headers })
    .then((r: any) => {
      return r;
    })
    .catch((err: any) => {
      throw new Error(`Ghost Admin API error: ${JSON.stringify(err)}`);
    });
};

export const requestSet = async <T = any>(
  body: SetAdminPostParams
): Promise<T> => {
  var url = `${envMap.ghost.host}/ghost/api/admin/posts/${body.id}/?source=html`;

  const headers = { Authorization: `Ghost ${generateToken()}` };
  const reqBody = {
    posts: [
      {
        title: body.title,
        featureImageUrl: body.featureImageUrl,
        html: body.html,
        status: body.status,
        updated_at: body.updated_at,
      },
    ],
  };

  return await axios
    .put(`${url}`, reqBody, { headers: headers })
    .then((r: any) => {
      return r;
    })
    .catch((err: any) => {
      throw new Error(`Ghost Admin API error: ${JSON.stringify(err)}`);
    });
};
