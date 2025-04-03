import { Request } from "express";
import {
  AdminPost,
  GetAdminPostResponse,
  MutateAdminPostsResponse,
  SetAdminPostParams
} from "../../types/entity/adminPost";
import { requestGet, requestSet } from "./requestGhostBase";

export const getPageCore = async (
  pageId: string
): Promise<GetAdminPostResponse> => {
  const path = `pages/${pageId}`;
  const params = new Map<string, string>([["formats", "html"]]);

  try {
    const response = await requestGet(path, params);
    const ghostPost: AdminPost = response.data.pages[0];

    if (!ghostPost) {
      return { result: "Success", post: null };
    }

    return {
      result: "Success",
      post: {
        id: ghostPost.id,
        title: ghostPost.title,
        featureImageUrl: ghostPost.featureImageUrl,
        html: ghostPost.html,
        status: ghostPost.status,
        published_at: ghostPost.published_at!,
        updated_at: ghostPost.updated_at
      }
    };
  } catch (error: any) {
    if (error.status === 422) {
      return { result: "Success", post: null };
    }
    console.error("Core Error:", error);
    return { result: "Failure", post: null };
  }
};

export const administratorPageGet = async (
  req: Request
): Promise<GetAdminPostResponse> => {
  return getPageCore(req.body.id);
};

export const administratorSetPageCore = async (
  req: SetAdminPostParams
): Promise<MutateAdminPostsResponse> => {
  var res: MutateAdminPostsResponse;
  return await requestSet(req, "pages")
    .then(() => {
      res = { result: "Success" };
      return res;
    })
    .catch((err: any) => {
      console.log(err);
      res = { result: "Failure" };
      return res;
    });
};
