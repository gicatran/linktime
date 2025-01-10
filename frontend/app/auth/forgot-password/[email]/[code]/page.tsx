import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ResetPasswordPage = async () => {
	const savedEmail = (await cookies()).get("resetPassword_email")?.value;
	const savedCode = (await cookies()).get("resetPassword_code")?.value;

	if (savedCode === undefined) {
		redirect("/auth/forgot-password");
	}

	return (
		<>
			<h1 className="title">Choose a new password</h1>
			<p className="subtitle">
				Enter your new password to complete the password reset process.
			</p>
			<Separator className="my-6" />
			<ResetPasswordForm email={savedEmail!} />
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

export default ResetPasswordPage;
