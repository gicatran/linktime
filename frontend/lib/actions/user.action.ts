"use server";

import { authFetch } from "./account.action";

export async function getCurrentProfile() {
	try {
		const response = await authFetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/current-profile`
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function getProfileByUsername(username: string) {
	try {
		const response = await authFetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username }),
			}
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
