import {
  GetAdminPostResponse,
  SetAdminPostParams
} from "@/server/types/entity/adminPost";
import { UploadImageResponse } from "@/server/types/entity/content";
import axios from "axios";
import { Request } from "express";
import FormData from "form-data";
import { formidable } from "formidable";
import fs from "fs";
import { JSDOM } from "jsdom";
import { envMap } from "../..";
import { administratorSetPageCore, getPageCore } from "./page";
import { generateToken } from "./requestGhostBase";

const makeNewListHtml = (html: string, url: string): string => {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const ulElement = document.querySelector("ul");
  const newLi = document.createElement("li");
  newLi.textContent = url;
  ulElement!.appendChild(newLi);

  return dom.serialize();
};

const addImageUrlToPage = async (url: string): Promise<boolean> => {
  const pageResponse: GetAdminPostResponse = await getPageCore(
    process.env.NEXT_PUBLIC_IMAGE_MANAGER_ID!
  );
  if (pageResponse.result === "Failure" || !pageResponse.post) {
    return false;
  }
  const updated_at = pageResponse.post.updated_at;
  const html = makeNewListHtml(pageResponse.post.html, url);

  const setRequest: SetAdminPostParams = {
    id: process.env.NEXT_PUBLIC_IMAGE_MANAGER_ID!,
    html: html,
    updated_at: updated_at
  };

  const setResponse = await administratorSetPageCore(setRequest);
  if (setResponse.result === "Failure") {
    return false;
  }

  return true;
};

export const uploadImage = async (
  req: Request
): Promise<UploadImageResponse> => {
  return new Promise<UploadImageResponse>((resolve) => {
    const form = formidable();
    form.parse(req, async (err, _, files) => {
      if (err) {
        resolve({ result: "Failure", url: null });
        return;
      }

      if (!files.file) {
        resolve({ result: "Failure", url: null });
        return;
      }
      const file = files.file[0];
      if (!file) {
        resolve({ result: "Failure", url: null });
        return;
      }

      try {
        const formData = new FormData();
        formData.append(
          "file",
          fs.createReadStream(file.filepath),
          file.originalFilename!
        );
        formData.append("purpose", "image");

        const response = await axios.post(
          `${envMap.ghost.host}/ghost/api/admin/images/upload/`,
          formData,
          {
            headers: {
              Authorization: `Ghost ${generateToken()}`,
              ...formData.getHeaders()
            }
          }
        );

        const externalUrl = new URL(
          "/api/images/" +
            new URL(response.data.images[0].url).pathname.substring(
              "/content/images/".length
            ),
          `${envMap.PROTOCOL}://${envMap.HOST}:${envMap.PORT}`
        ).toString();

        for (let i: number = 0; i < 3; i++) {
          if (await addImageUrlToPage(externalUrl)) break;
        }

        resolve({ result: "Success", url: externalUrl });
        return;
      } catch (error) {
        console.error("Error uploading to Ghost:", error);
        resolve({ result: "Failure", url: null });
        return;
      }
    });
  });
};
