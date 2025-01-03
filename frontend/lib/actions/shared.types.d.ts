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
	remember: boolean;
}

export type Session = {
	account: {
		id: string;
		email: string;
	};
	// accessToken: string;
	// refreshToken: string;
};
