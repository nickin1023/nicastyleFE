import express, { Request, Response } from "express";
import http from "http";
import next from "next";
import { uploadImage } from "./api/administrator/content";
import { administratorPageGet } from "./api/administrator/page";
import {
  administratorAddPost,
  administratorGet,
  administratorGetArticles,
  administratorSetPost
} from "./api/administrator/post";
import { sendMail } from "./api/contact";
import { getImage } from "./api/content";
import { getPost, getPosts } from "./api/post";
import { createEnvMap } from "./envMap/createEnvMap";
import { EnvMap } from "./envMap/envMap";
import { GhostError } from "./types/entity/content";

const isDev = process.env.NODE_ENV !== "production";

export let envMap: EnvMap;

const main = async () => {
  const app = express();
  const nextApp = next({ dev: isDev });
  await nextApp.prepare();

  // 変数の読み込み、createServerよりも前で行うこと
  envMap = createEnvMap();

  const nextRequestHandler = nextApp.getRequestHandler();

  app.use(express.json());

  // admin path start

  app.all("/api/administrator/*", (req: Request, res: Response, next) => {
    if (!isDev) {
      // ローカル以外からは基本的に接続されないはずだが、サーバーサイドでも塞ぐ
      console.warn("admin access from not local");
      res.sendStatus(404);
      return;
    }
    next();
  });

  app.post("/api/administrator/articles", (req: Request, res: Response) => {
    administratorGetArticles(req).then((r) => {
      console.log("=====request=====", req.body);
      console.log("server side /api/administrator/articles");
      console.log("=====response=====", r);
      res.status(200).send(r);
    });
  });

  app.post("/api/administrator/article", (req: Request, res: Response) => {
    administratorGet(req).then((r) => {
      console.log("=====request=====", req.body);
      console.log("server side /api/administrator/article");
      console.log("=====response=====", r);
      res.status(200).send(r);
    });
  });

  app.post("/api/administrator/setArticle", (req: Request, res: Response) => {
    administratorSetPost(req).then((r) => {
      console.log("=====request=====", req.body);
      console.log("server side /api/administrator/setArticle");
      console.log("=====response=====", r);
      res.status(200).send(r);
    });
  });

  app.post("/api/administrator/addArticle", (req: Request, res: Response) => {
    administratorAddPost(req).then((r) => {
      console.log("=====request=====", req.body);
      console.log("server side /api/administrator/addArticle");
      console.log("=====response=====", r);
      res.status(200).send(r);
    });
  });

  app.post("/api/administrator/uploadImage", (req: Request, res: Response) => {
    uploadImage(req).then((r) => {
      console.log("=====request=====");
      console.log("server side /api/administrator/uploadImage");
      console.log("=====response=====", r);
      res.status(200).send(r);
    });
  });

  app.post("/api/contact", (req: Request, res: Response) => {
    sendMail(req).then((r) => {
      console.log("=====request=====", req.body);
      console.log("server side /api/contact");
      console.log("=====response=====", r.result);
      res.status(200).send(r);
    });
  });

  app.post("/api/administrator/page", (req: Request, res: Response) => {
    administratorPageGet(req).then((r) => {
      console.log("=====request=====", req.body);
      console.log("server side /api/administrator/page");
      console.log("=====response=====", r);
      res.status(200).send(r);
    });
  });

  // admin path end

  app.post("/api/articles", (req: Request, res: Response) => {
    getPosts(req).then((r) => {
      console.log("=====request=====", req.body);
      console.log("server side /api/articles");
      console.log("=====response=====", r);
      res.status(200).send(r);
    });
  });

  app.post("/api/article", (req: Request, res: Response) => {
    getPost(req).then((r) => {
      console.log("=====request=====", req.body);
      console.log(`server side /api/article/${req.body.id}`);
      console.log("=====response=====", r);
      res.status(200).send(r);
    });
  });

  app.get("/api/images/*", async (req: Request, res: Response) => {
    try {
      const { headers, data } = await getImage(req);

      res.set({
        "Content-Type": headers["content-type"],
        "Cache-Control": "public, max-age=31536000"
      });

      console.log("=====request=====");
      console.log(`server side /api/article/${req.params[0]}`);
      console.log("=====response=====");

      data.pipe(res);
    } catch (error) {
      const ghostError = error as GhostError;
      if (ghostError.statusCode) {
        res.status(ghostError.statusCode).json({
          error: ghostError.message
        });
      } else {
        res.status(500).json({
          error: "画像処理中に予期せぬエラーが発生しました",
          details: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
  });

  app.all("*", (req: Request, res: Response) => {
    return nextRequestHandler(req, res);
  });

  const httpServer = http.createServer(app);
  app.set("port", envMap.PORT);

  httpServer.listen(envMap.PORT, (err?: any) => {
    if (err) {
      process.exit(1);
    }

    console.log(
      `> Server listening at ${envMap.PROTOCOL}://${envMap.HOST}:${envMap.PORT} as ${
        isDev ? "development" : process.env.NODE_ENV
      }`
    );
  });
};

main();
