import { GetPostsRequest, GetPostsResponse } from "@/server/types/entity/post";
import axios from "axios";

export const getArticles = async (
  req: GetPostsRequest
): Promise<GetPostsResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await axios.post(`${baseUrl}/api/articles`, req);
  return res.data;
};
