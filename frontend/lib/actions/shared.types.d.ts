export interface FormState {
	success: boolean;
	error?: Error;
}

export interface RegisterParams {
	name: string;
	username: string;
	email: string;
	password: string;
}

export interface LoginParams {
	email: string;
	password: string;
}

export type Session = {
	account: {
		id: number;
		email: string;
	};
	accessToken: string;
	refreshToken: string;
};

export interface FetchOptions extends RequestInit {
	headers?: Record<string, string>;
}
