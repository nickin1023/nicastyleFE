import { Request } from "express";
import { AdminGhostPost } from "../../types/beEntity/ghost";
import {
  AdminPost,
  GetAdminPostRequest,
  GetAdminPostsResponse,
  SetAdminPostParams,
  SetAdminPostsResponse,
} from "../../types/entity/adminPost";
import { requestGet, requestSet } from "./requestGhostBase";

export const administratorGet = async (
  req: Request
): Promise<GetAdminPostsResponse> => {
  const body: GetAdminPostRequest = req.body;
  var res: GetAdminPostsResponse;
  var path: string;
  if (body.id) {
    path = `posts/${body.id}`;
  } else {
    path = "posts";
  }
  const params = new Map<string, string>();
  params.set("formats", "html");
  return await requestGet(path, params)
    .then((r: any) => {
      const posts: AdminPost[] = r.data.posts.map(
        (element: AdminGhostPost): AdminPost => ({
          id: element.id,
          title: element.title,
          featureImageUrl: element.feature_image,
          html: element.html,
          status: element.status,
          published_at: element.published_at,
          updated_at: element.updated_at,
        })
      );
      res = { result: "Success", posts: posts };
      return res;
    })
    .catch((err: any) => {
      console.log(err);
      res = { result: "Failure", posts: null };
      return res;
    });
};

export const administratorSetPost = async (
  req: Request
): Promise<SetAdminPostsResponse> => {
  const body: SetAdminPostParams = req.body;
  var res: SetAdminPostsResponse;
  return await requestSet(body)
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
