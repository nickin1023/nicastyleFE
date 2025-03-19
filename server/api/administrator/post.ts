import { Request } from "express";
import { AdminGhostPost } from "../../types/beEntity/ghost";
import {
  AddAdminPostParams,
  AdminPost,
  GetAdminPostRequest,
  GetAdminPostResponse,
  GetAdminPostsRequest,
  GetAdminPostsResponse,
  MutateAdminPostsResponse,
  SetAdminPostParams
} from "../../types/entity/adminPost";
import { requestAdd, requestGet, requestSet } from "./requestGhostBase";

export const administratorGetArticles = async (
  req: Request
): Promise<GetAdminPostsResponse> => {
  const body: GetAdminPostsRequest = req.body;
  var res: GetAdminPostsResponse;
  const path = "posts";
  const params = new Map<string, string>();
  params.set("formats", "html");
  params.set("limit", body.limit.toString());
  params.set("page", body.page.toString());
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
          updated_at: element.updated_at
        })
      );
      const pagination = {
        page: r.data.meta.pagination.page,
        limit: r.data.meta.pagination.limit,
        pages: r.data.meta.pagination.pages,
        total: r.data.meta.pagination.total,
        next: r.data.meta.pagination.next,
        prev: r.data.meta.pagination.prev
      };
      res = { result: "Success", posts: posts, pagination: pagination };
      return res;
    })
    .catch((err: any) => {
      console.log(err);
      res = { result: "Failure", posts: null, pagination: null };
      return res;
    });
};

export const administratorGet = async (
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

export const administratorSetPost = async (
  req: Request
): Promise<MutateAdminPostsResponse> => {
  const body: SetAdminPostParams = req.body;
  var res: MutateAdminPostsResponse;
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

export const administratorAddPost = async (
  req: Request
): Promise<MutateAdminPostsResponse> => {
  const body: AddAdminPostParams = req.body;
  var res: MutateAdminPostsResponse;
  return await requestAdd(body)
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
