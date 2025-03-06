import { GetPostRequest, GetPostsResponse } from "@/server/types/entity/post";
import axios from "axios";

export const getBlogs = async (
  getPostRequest: GetPostRequest
): Promise<GetPostsResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await axios.post(`${baseUrl}/api/blogs`, getPostRequest);
  return res.data;
};
