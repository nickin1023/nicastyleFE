import {
  GetAdminPostRequest,
  GetAdminPostsResponse,
  SetAdminPostParams,
  SetAdminPostsResponse,
} from "@/server/types/entity/adminPost";
import axios from "axios";

export const getBlogs = async (
  getPostRequest: GetAdminPostRequest
): Promise<GetAdminPostsResponse> => {
  const res = await axios.post("/api/administrator/blogs", getPostRequest);
  return res.data;
};

export const setBlog = async (
  setParams: SetAdminPostParams
): Promise<SetAdminPostsResponse> => {
  const res = await axios.post("/api/administrator/setBlog", setParams);
  return res.data;
};
