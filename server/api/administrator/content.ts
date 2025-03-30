import { UploadImageResponse } from "@/server/types/entity/content";
import axios from "axios";
import { Request } from "express";
import FormData from "form-data";
import { formidable } from "formidable";
import fs from "fs";
import { envMap } from "../..";
import { generateToken } from "./requestGhostBase";

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
        );

        resolve({ result: "Success", url: externalUrl.toString() });
        return;
      } catch (error) {
        console.error("Error uploading to Ghost:", error);
        resolve({ result: "Failure", url: null });
        return;
      }
    });
  });
};
