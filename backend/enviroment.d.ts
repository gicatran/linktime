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
    }
  }
}

export {};
