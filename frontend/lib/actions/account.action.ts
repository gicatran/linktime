"use server";

import { cookies } from "next/headers";
import { loginSchema, registerSchema } from "../validation";
import {
	FormState,
	LoginParams,
	RegisterParams,
	Session,
} from "./shared.types";
import { jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";

export async function register(params: RegisterParams): Promise<FormState> {
	try {
		const validationFields = registerSchema.safeParse({
			name: params.name,
			email: params.email,
			password: params.password,
			confirmPassword: params.confirmPassword,
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
			remember: params.remember,
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
		});

		return {
			success: true,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function createSession(params: Session) {
	try {
		const expiredAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
		const encodedKey = new TextEncoder().encode(
			process.env.SESSION_SECRET_KEY
		);

		const session = await new SignJWT(params)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(expiredAt)
			.sign(encodedKey);

		(await cookies()).set("session", session, {
			httpOnly: true,
			secure: true,
			expires: expiredAt,
			sameSite: "strict",
			path: "/",
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function getSession() {
	try {
		const cookie = (await cookies()).get("session")?.value;
		const encodedKey = new TextEncoder().encode(
			process.env.SESSION_SECRET_KEY
		);

		if (!cookie) {
			return null;
		}

		const { payload } = await jwtVerify(cookie, encodedKey, {
			algorithms: ["HS256"],
		});

		if (!payload) {
			return redirect("/auth/login");
		}

		return payload as Session;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function deleteSession() {
	(await cookies()).delete("session");
}
