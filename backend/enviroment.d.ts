declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      DATABASE_URL: string;

      FRONTEND_URL: string;

      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;

      REFRESH_JWT_SECRET: string;
      REFRESH_JWT_EXPIRES_IN: string;

      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_CALLBACK_URL: string;

      MAILER_HOST: string;
      MAILER_PORT: number;
      MAILER_USER: string;
      MAILER_PASSWORD: string;
      MAILER_DEFAULT_NAME: string;
      MAILER_DEFAULT_EMAIL: string;
    }
  }
}

export {};
