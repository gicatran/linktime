declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			NEXT_PUBLIC_BACKEND_URL: string;
			NEXT_PUBLIC_FRONTEND_URL: string;
			SESSION_SECRET_KEY: string;
		}
	}
}

export {};
