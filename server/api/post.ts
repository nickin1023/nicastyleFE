import axios from "axios";
import { Request } from "express";
import { envMap } from "..";
import { GhostPost } from "../types/beEntity/ghost";
import { GetPostRequest, GetPostsResponse, Post } from "../types/entity/post";

export const getPosts = async (req: Request) => {
  const body: GetPostRequest = req.body;
  var res: GetPostsResponse;
  var url: string;
  if (body.id) {
    url = `${envMap.ghost.host}/ghost/api/content/posts/${body.id}`;
  } else {
    url = `${envMap.ghost.host}/ghost/api/content/posts`;
  }
  return await axios
    .get(`${url}/?key=${envMap.ghost.apiKey}`)
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
