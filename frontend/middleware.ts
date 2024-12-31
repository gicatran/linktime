import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/actions/account.action";

export default async function middleware(req: NextRequest) {
	const session = await getSession();

	if (!session || !session.account) {
		return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
	}

	NextResponse.next();
}

export const config = {
	matcher: ["/"],
};
