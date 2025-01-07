"use server";

import { authFetch } from "./account.action";

export async function getProfile() {
	const response = await authFetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`
	);
	const result = await response.json();
	return result;
}
