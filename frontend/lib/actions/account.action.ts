"use server";

import { loginSchema, registerSchema } from "../validation";
import {
	FetchOptions,
	FormState,
	LoginParams,
	RegisterParams,
} from "./shared.types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
	createSession,
	deleteSession,
	getSession,
	refreshToken,
} from "./session.action";

export async function register(params: RegisterParams): Promise<FormState> {
	try {
		const validationFields = registerSchema.safeParse({
			name: params.name,
			username: params.username,
			email: params.email,
			password: params.password,
		});

		if (!validationFields.success) {
			return {
				success: false,
				error: Error(validationFields.error.errors[0].message),
			};
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(validationFields.data),
			}
		);

		if (!response.ok) {
			return {
				success: false,
				error: Error(
					response.status === 409
						? "Account already existed!"
						: response.statusText
				),
			};
		}

		return {
			success: true,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function login(params: LoginParams): Promise<FormState> {
	try {
		const validationFields = loginSchema.safeParse({
			email: params.email,
			password: params.password,
		});

		if (!validationFields.success) {
			return {
				success: false,
				error: Error(validationFields.error.errors[0].message),
			};
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(validationFields.data),
			}
		);

		if (!response.ok) {
			return {
				success: false,
				error: Error(
					response.status === 401
						? "Invalid email or password!"
						: response.statusText
				),
			};
		}

		const result = await response.json();

		await createSession({
			account: {
				id: result.id,
				email: result.email,
			},
			accessToken: result.accessToken,
			refreshToken: result.refreshToken,
		});

		return {
			success: true,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function logout() {
	try {
		const response = await authFetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
			{
				method: "POST",
			}
		);

		if (response.ok) {
			await deleteSession();
		}

		revalidatePath("/", "layout");
		revalidatePath("/", "page");
		redirect("/");
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function authFetch(url: string | URL, options: FetchOptions = {}) {
	const session = await getSession();

	options.headers = {
		...options.headers,
		Authorization: `Bearer ${session?.accessToken}`,
	};

	let response = await fetch(url, options);

	if (response.status === 401) {
		if (!session?.refreshToken) throw new Error("Refresh token not found!");

		const newAccessToken = await refreshToken(session.refreshToken);

		if (newAccessToken) {
			options.headers.Authorization = `Bearer ${newAccessToken}`;
			response = await fetch(url, options);
		}
	}

	return response;
}
