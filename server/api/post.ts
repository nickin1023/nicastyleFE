import axios from "axios";
import { Request } from "express";
import { envMap } from "..";
import { GhostPost } from "../types/beEntity/ghost";
import {
  GetPostRequest,
  GetPostResponse,
  GetPostsResponse,
  Post
} from "../types/entity/post";

export const getPosts = async (): Promise<GetPostsResponse> => {
  var res: GetPostsResponse;
  const url = `${envMap.ghost.host}/ghost/api/content/posts`;
  return await axios
    .get(`${url}/?key=${envMap.ghost.apiKey}&limit=2`)
    .then((r: any) => {
      const posts: Post[] = r.data.posts.map(
        (element: GhostPost): Post => ({
          id: element.id,
          title: element.title,
          featureImageUrl: element.feature_image,
          html: element.html,
          published_at: element.published_at!,
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

export const getPost = async (req: Request): Promise<GetPostResponse> => {
  const body: GetPostRequest = req.body;
  var res: GetPostResponse;
  const url = `${envMap.ghost.host}/ghost/api/content/posts/${body.id}`;

  return await axios
    .get(`${url}/?key=${envMap.ghost.apiKey}`)
    .then((r: any) => {
      const ghostPost: GhostPost = r.data.posts[0];
      if (!ghostPost) {
        res = { result: "Success", post: null };
        return res;
      }
      const post: Post = {
        id: ghostPost.id,
        title: ghostPost.title,
        featureImageUrl: ghostPost.feature_image,
        html: ghostPost.html,
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
