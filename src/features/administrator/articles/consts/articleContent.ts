export type ClientSetParams = {
  id: string;
  title?: string;
  featureImageUrl?: string;
  html?: string;
  status?: string;
};

export const initialSetAdminPostParams: ClientSetParams = {
  title: "",
  id: "",
  html: ""
};
