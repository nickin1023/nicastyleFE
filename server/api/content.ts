import axios, { AxiosResponse } from "axios";
import { Request } from "express";
import { Readable } from "stream";
import { envMap } from "..";
import { GhostError } from "../types/entity/content";

interface GhostImageResponse {
  headers: {
    "content-type": string;
  };
  data: Readable;
}

export const getImage = async (req: Request): Promise<GhostImageResponse> => {
  const imagePath = req.params[0];
  const url = `${envMap.ghost.host}/content/images/${imagePath}`;
  const response: AxiosResponse<Readable> = await axios.get(url, {
    responseType: "stream",
    headers: {
      Authorization: `Ghost ${process.env.GHOST_ADMIN_API_KEY}`,
      Accept: "image/*"
    },
    validateStatus: (status) => status < 500
  });

  if (response.status >= 400) {
    throw {
      statusCode: response.status,
      message: "Ghostサーバーから画像を取得できませんでした"
    } as GhostError;
  }

  return {
    headers: {
      "content-type": typeof response.headers["content-type"] === "string"
        ? response.headers["content-type"]
        : "image/png"
    },
    data: response.data
  };
};
