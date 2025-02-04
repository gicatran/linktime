import { getSession, refreshToken } from "@/lib/actions/session.action";
import { isTokenExpired } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const authMiddleware = async (req: NextRequest) => {
	const session = await getSession();

	if (session && session.account) {
		return NextResponse.redirect(new URL("/", req.nextUrl));
	}

	return NextResponse.next();
};

export const defaultMiddleware = async (req: NextRequest) => {
	const session = await getSession();
	const sessionToken = (await cookies()).get("session")?.value;

	if (!session || !session.account) {
		return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
	}

	try {
		const { accessToken } = session;

		if (!accessToken || !sessionToken || !session.refreshToken) {
			throw new Error("Tokens not found in session!");
		}

		const accessTokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
		const isAccessTokenExpired = isTokenExpired(accessTokenPayload.exp);

		if (isAccessTokenExpired) {
			const response = NextResponse.next();
			return await refreshToken({
				sessionToken,
				oldRefreshToken: session.refreshToken,
				response,
			});
		}
	} catch (error) {
		console.error("Error checking token expiration: ", error);
	}

	return NextResponse.next();
};
