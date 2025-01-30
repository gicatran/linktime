import { createSession } from "@/lib/actions/session.action";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);

	const accountId = searchParams.get("accountId");
	const email = searchParams.get("email");
	const accessToken = searchParams.get("accessToken");
	const refreshToken = searchParams.get("refreshToken");

	if (!accountId || !email || !accessToken || !refreshToken) {
		throw new Error("Google OAuth Failed!");
	}

	await createSession({
		account: {
			id: Number.parseInt(accountId),
			email: email,
		},
		accessToken,
		refreshToken,
	});

	redirect("/");
}
