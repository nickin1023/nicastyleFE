import { GetPostRequest, GetPostsResponse } from "@/server/types/entity/post";
import axios from "axios";

export const getBlogs = async (
  getPostRequest: GetPostRequest
): Promise<GetPostsResponse> => {
  const res = await axios.post("/api/blogs", getPostRequest);
  return res.data;
};
