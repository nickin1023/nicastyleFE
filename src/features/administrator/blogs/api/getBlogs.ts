import {
  GetAdminPostRequest,
  GetAdminPostsResponse,
} from "@/server/types/entity/adminPost";
import axios from "axios";

export const getBlogs = async (
  getPostRequest: GetAdminPostRequest
): Promise<GetAdminPostsResponse> => {
  const res = await axios.post("/api/administrator/blogs", getPostRequest);
  return res.data;
};
