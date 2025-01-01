import axios from "axios";
import { Request } from "express";
import { envMap } from "..";
import { GhostPost } from "../types/beEntity/ghost";
import { GetPostRequest, GetPostsResponse, Post } from "../types/entity/post";

export const getPost = async (req: Request) => {
  const body: GetPostRequest = req.body;
};

export const getBlogs = async (req: Request) => {
  var res: GetPostsResponse;
  return await axios
    .get(
      `${envMap.ghost.host}/ghost/api/content/posts/?key=${envMap.ghost.apiKey}`
    )
    .then((r: any) => {
      const posts: Post[] = r.data.posts.map(
        (element: GhostPost): Post => ({
          id: element.id,
          title: element.title,
          featureImageUrl: element.feature_image,
          html: element.html,
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
