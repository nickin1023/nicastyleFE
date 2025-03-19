import { GetPostRequest, GetPostResponse } from "@/server/types/entity/post";
import axios from "axios";

export const getArticle = async (
  getPostRequest: GetPostRequest
): Promise<GetPostResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await axios.post(`${baseUrl}/api/article`, getPostRequest);
  return res.data;
};
