"use server";

import {
	forgotPasswordCodeSchema,
	forgotPasswordSchema,
	loginSchema,
	registerSchema,
	resetPasswordSchema,
} from "../validation";
import { FormState, LoginParams, RegisterParams } from "./shared.types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSession, deleteSession } from "./session.action";
import { cookies } from "next/headers";
import { authFetch } from "./user.action";

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

export async function forgotPassword(email: string): Promise<FormState> {
	try {
		const validationFields = forgotPasswordSchema.safeParse({
			email,
		});

		if (!validationFields.success) {
			return {
				success: false,
				error: Error(validationFields.error.errors[0].message),
			};
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
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
				error: Error(response.statusText),
			};
		}

		(await cookies()).set("resetPassword_email", email);

		return {
			success: true,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function forgotPasswordCode(
	email: string,
	code: string
): Promise<FormState> {
	try {
		const validationFields = forgotPasswordCodeSchema.safeParse({
			email,
			code,
		});

		if (!validationFields.success) {
			return {
				success: false,
				error: Error(validationFields.error.errors[0].message),
			};
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password/code`,
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
				error: Error(response.statusText),
			};
		}

		(await cookies()).set("resetPassword_code", code);

		return {
			success: true,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function resetPassword(
	email: string,
	password: string
): Promise<FormState> {
	try {
		const validationFields = resetPasswordSchema.safeParse({
			email,
			password,
		});

		if (!validationFields.success) {
			return {
				success: false,
				error: Error(validationFields.error.errors[0].message),
			};
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password/reset`,
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
				error: Error(response.statusText),
			};
		}

		(await cookies()).delete("resetPassword_email");
		(await cookies()).delete("resetPassword_code");

		return {
			success: true,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
}
