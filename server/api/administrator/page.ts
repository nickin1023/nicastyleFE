import { Request } from "express";
import {
  AdminPost,
  GetAdminPostRequest,
  GetAdminPostResponse
} from "../../types/entity/adminPost";
import { requestGet } from "./requestGhostBase";

export const administratorPageGet = async (
  req: Request
): Promise<GetAdminPostResponse> => {
  const body: GetAdminPostRequest = req.body;
  var res: GetAdminPostResponse;
  const path = `posts/${body.id}`;
  const params = new Map<string, string>();
  params.set("formats", "html");
  return await requestGet(path, params)
    .then((r: any) => {
      const ghostPost: AdminPost = r.data.posts[0];
      if (!ghostPost) {
        res = { result: "Success", post: null };
        return res;
      }
      const post: AdminPost = {
        id: ghostPost.id,
        title: ghostPost.title,
        featureImageUrl: ghostPost.featureImageUrl,
        html: ghostPost.html,
        status: ghostPost.status,
        published_at: ghostPost.published_at!,
        updated_at: ghostPost.updated_at
      };
      res = { result: "Success", post: post };
      return res;
    })
    .catch((err: any) => {
      if (err.status && err.status === 422) {
        res = { result: "Success", post: null };
        return res;
      }
      console.log(err);
      res = { result: "Failure", post: null };
      return res;
    });
};
