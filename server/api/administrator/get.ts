import { IncomingMessage, ServerResponse } from "http";

type AdministratorGetResponse = {
  name: string;
};

export default function administratorGet(
  req: IncomingMessage,
  res: ServerResponse
) {
  const responseBody: AdministratorGetResponse = {
    name: "admin/get",
  };

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(responseBody));
}
