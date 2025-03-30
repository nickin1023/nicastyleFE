export type GetImageRequest = {
  id?: string | null;
};

export type GhostError = {
  statusCode: number;
  message: string;
};

export type UploadImageRequest = {
  data: FormData;
};

export type UploadImageResponse = {
  result: "Success" | "Failure";
  url: string | null;
};
