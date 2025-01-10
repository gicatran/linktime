"use server";

import { jwtVerify, SignJWT } from "jose";
import { Session } from "./shared.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
			sameSite: "lax",
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

export async function refreshToken(oldRefreshToken: string) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					refresh: oldRefreshToken,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to refresh token!");
		}

		const { accessToken, refreshToken } = await response.json();

		const updateRes = await fetch(
			`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/update`,
			{
				method: "POST",
				body: JSON.stringify({
					accessToken,
					refreshToken,
				}),
			}
		);

		if (!updateRes.ok) {
			throw new Error("Failed to update tokens!");
		}

		return accessToken;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function updateTokens({
	accessToken,
	refreshToken,
}: {
	accessToken: string;
	refreshToken: string;
}) {
	const cookie = (await cookies()).get("session")?.value;
	const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET_KEY);

	if (!cookie) return null;

	const { payload } = await jwtVerify<Session>(cookie, encodedKey);

	if (!payload) throw new Error("Session not found!");

	const newPayload: Session = {
		account: {
			...payload.account,
		},
		accessToken,
		refreshToken,
	};

	await createSession(newPayload);
}
