"use server";

import { getSession } from "./session.action";
import { FetchOptions } from "./shared.types";

export async function authFetch(url: string, options: FetchOptions = {}) {
	try {
		const session = await getSession();

		options.headers = {
			...options.headers,
			Authorization: `Bearer ${session?.accessToken}`,
		};

		return await fetch(url, options);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function getProfile({
	id,
	username,
}: {
	id?: number;
	username?: string;
}) {
	try {
		const response = await authFetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id, username }),
			}
		);

		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
