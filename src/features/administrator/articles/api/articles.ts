import {
  AddAdminPostParams,
  GetAdminPostRequest,
  GetAdminPostResponse,
  GetAdminPostsRequest,
  GetAdminPostsResponse,
  MutateAdminPostsResponse,
  SetAdminPostParams
} from "@/server/types/entity/adminPost";
import axios from "axios";

export const getArticles = async (
  getPostRequest: GetAdminPostsRequest
): Promise<GetAdminPostsResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await axios.post(
    `${baseUrl}/api/administrator/articles`,
    getPostRequest
  );
  return res.data;
};

export const getArticle = async (
  getPostRequest: GetAdminPostRequest
): Promise<GetAdminPostResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await axios.post(
    `${baseUrl}/api/administrator/article`,
    getPostRequest
  );
  return res.data;
};

export const setArticle = async (
  setParams: SetAdminPostParams
): Promise<MutateAdminPostsResponse> => {
  const res = await axios.post("/api/administrator/setArticle", setParams);
  return res.data;
};

export const addArticle = async (
  addParams: AddAdminPostParams
): Promise<MutateAdminPostsResponse> => {
  const res = await axios.post("/api/administrator/addArticle", addParams);
  return res.data;
};
