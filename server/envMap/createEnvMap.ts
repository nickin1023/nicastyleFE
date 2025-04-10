import { EnvMap } from "./envMap";

export const createEnvMap = (): EnvMap => {
  const envMap: EnvMap = {
    PROTOCOL: validateEnv("PROTOCOL", process.env.PROTOCOL),
    HOST: validateEnv("HOST", process.env.HOST),
    PORT: Number(process.env.PORT) || 3000,
    MAIL_ADDRESS: validateEnv("MAIL_ADDRESS", process.env.MAIL_ADDRESS),
    ghost: {
      host: validateEnv("GHOST_HOST", process.env.GHOST_HOST),
      apiKey: validateEnv("GHOST_API_KEY", process.env.GHOST_API_KEY),
      adminApiKey: validateEnv(
        "GHOST_ADMIN_API_KEY",
        process.env.GHOST_ADMIN_API_KEY
      )
    },
    gmail: {
      client: {
        clientId: validateEnv("GMAIL_CLIENT_ID", process.env.GMAIL_CLIENT_ID),
        clientSecret: validateEnv(
          "GMAIL_CLIENT_SECRET",
          process.env.GMAIL_CLIENT_SECRET
        ),
        redirectUri: validateEnv(
          "GMAIL_REDIRECT_URI",
          process.env.GMAIL_REDIRECT_URI
        )
      },
      token: {
        access_token: validateEnv(
          "GMAIL_ACCESS_TOKEN",
          process.env.GMAIL_ACCESS_TOKEN
        ),
        refresh_token: validateEnv(
          "GMAIL_REFRESH_TOKEN",
          process.env.GMAIL_REFRESH_TOKEN
        ),
        scope: validateEnv("GMAIL_TOKEN_SCOPE", process.env.GMAIL_TOKEN_SCOPE),
        token_type: validateEnv(
          "GMAIL_TOKEN_TYPE",
          process.env.GMAIL_TOKEN_TYPE
        ),
        expiry_date: Number(
          validateEnv(
            "GMAIL_TOKEN_EXPIRE_DATE",
            process.env.GMAIL_TOKEN_EXPIRE_DATE
          )
        )
      }
    }
  };

  return envMap;
};

const validateEnv = (
  name: string,
  value: string | undefined | null
): string => {
  if (value === undefined || value === null) {
    throw new Error(`Expected ${name} to be defined, but received ${value}`);
  }

  return value;
};
