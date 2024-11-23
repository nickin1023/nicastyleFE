export type EnvMap = {
  ghost: {
    apiKey: string;
    adminApiKey: string;
  };
  gmail: {
    client: {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
    };
    token: {
      accessToken: string;
      refreshToken: string;
      scope: string;
      type: string;
      expiryDate: number;
    };
  };
};
