import { IncomingMessage, ServerResponse } from "http";

type AdministratorGetResponse = {
  name: string;
};

export const administratorGet = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const responseBody: AdministratorGetResponse = {
    name: "admin/get",
  };

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(responseBody));
};
