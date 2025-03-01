import {
  AddAdminPostParams,
  GetAdminPostRequest,
  GetAdminPostsResponse,
  MutateAdminPostsResponse,
  SetAdminPostParams
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
): Promise<MutateAdminPostsResponse> => {
  const res = await axios.post("/api/administrator/setBlog", setParams);
  return res.data;
};

export const addBlog = async (
  addParams: AddAdminPostParams
): Promise<MutateAdminPostsResponse> => {
  const res = await axios.post("/api/administrator/addBlog", addParams);
  return res.data;
};
