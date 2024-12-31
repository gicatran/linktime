declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			NEXT_PUBLIC_BACKEND_URL: string;
			SESSION_SECRET_KEY: string;
		}
	}
}

export {};
