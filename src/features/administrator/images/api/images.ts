import {
  GetAdminPostRequest,
  GetAdminPostResponse
} from "@/server/types/entity/adminPost";
import {
  UploadImageRequest,
  UploadImageResponse
} from "@/server/types/entity/content";
import axios from "axios";

export const uploadImage = async (
  req: UploadImageRequest
): Promise<UploadImageResponse> => {
  const res = await axios.post("/api/administrator/uploadImage", req.data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

export const getPage = async (
  getPostRequest: GetAdminPostRequest
): Promise<GetAdminPostResponse> => {
  const res = await axios.post("/api/administrator/page", getPostRequest);
  return res.data;
};
