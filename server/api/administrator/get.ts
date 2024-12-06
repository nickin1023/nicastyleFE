import { Request } from "express";

type AdministratorGetResponse = {
  name: string;
};

export const administratorGet = async (req: Request) => {
  const response: AdministratorGetResponse = {
    name: "admin/get",
  };

  return response;
};
