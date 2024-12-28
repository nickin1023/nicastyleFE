import { Credentials } from "google-auth-library";

export type EnvMap = {
  PORT: number;
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
