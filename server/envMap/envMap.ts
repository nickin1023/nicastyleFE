import { Credentials } from "google-auth-library";

export type EnvMap = {
  PORT: number;
  MAIL_ADDRESS: string;
  ghost: {
    host: string;
    apiKey: string;
    adminApiKey: string;
  };
  gmail: {
    client: {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
    };
    token: Credentials;
  };
};
