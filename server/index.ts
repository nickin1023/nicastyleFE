import { createServer } from "http";
import next from "next";
import { parse } from "url";
import { administratorGet } from "./api/administrator/get";
import { sendMail } from "./api/send-mail";
import { createEnvMap } from "./envMap/createEnvMap";
import { EnvMap } from "./envMap/envMap";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

export let envMap: EnvMap;

app.prepare().then(() => {
  // 変数の読み込み、createServerよりも前で行うこと
  envMap = createEnvMap();

  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);

    if (parsedUrl.pathname?.startsWith("/api/administrator")) {
      if (!process.env.NODE_ENV.match("development")) {
        // ローカル以外からのadminエンドポイントへの接続は404にする
        console.warn("admin access from not local");
        res.statusCode = 404;
        res.end("Not Found");
      }

      if (parsedUrl.pathname === "/api/administrator/get") {
        administratorGet(req, res);
      }
    }

    // エンドポイントごとの処理
    if (parsedUrl.pathname === "/api/send-mail") {
      sendMail(req, res);
    }
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});
