import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/actions/session.action";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ForgotPasswordPage = async () => {
	const session = await getSession();
	if (session && session.account) {
		redirect("/");
	}

	return (
		<>
			<h1 className="title">Forgot your password?</h1>
			<p className="subtitle">
				Don&apos;t worry! Enter your email and we will send you a reset
				code!
			</p>
			<Separator className="my-6" />
			<ForgotPasswordForm />
			<Separator className="my-6" />
			<p className="text-center">
				<Link
					href={"/auth/login"}
					className="text-blue-500 font-semibold"
				>
					Login
				</Link>
				{" | "}
				<Link
					href={"/auth/register"}
					className="text-blue-500 font-semibold"
				>
					Register
				</Link>
			</p>
		</>
	);
};

export default ForgotPasswordPage;
