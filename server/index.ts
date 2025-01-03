import express, { Request, Response } from "express";
import http from "http";
import next from "next";
import { administratorGet } from "./api/administrator/get";
import { sendMail } from "./api/contact";
import { getPosts } from "./api/post";
import { createEnvMap } from "./envMap/createEnvMap";
import { EnvMap } from "./envMap/envMap";

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

  app.all("/api/administrator/*", (req: Request, res: Response, next) => {
    if (!isDev) {
      // ローカル以外からのadminエンドポイントへの接続は404にする
      console.warn("admin access from not local");
      res.redirect("/404");
    }
    next();
  });

  app.get("/api/administrator/get", (req: Request, res: Response) => {
    administratorGet(req).then((r) => {
      console.log("=====request=====", req.body);
      console.log("server side /api/administrator/get");
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

  app.post("/api/blogs", (req: Request, res: Response) => {
    getPosts(req).then((r) => {
      console.log("=====request=====", req.body);
      console.log("server side /api/blogs");
      console.log("=====response=====", r);
      res.status(200).send(r);
    });
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
      `> Server listening at http://localhost:${envMap.PORT} as ${
        isDev ? "development" : process.env.NODE_ENV
      }`
    );
  });
};

main();
