import { Request } from "express";
import { AdminGhostPost } from "../../types/beEntity/ghost";
import {
  AdminPost,
  GetAdminPostRequest,
  GetAdminPostsResponse,
} from "../../types/entity/adminPost";
import { requestGet } from "./requestGhostBase";

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
