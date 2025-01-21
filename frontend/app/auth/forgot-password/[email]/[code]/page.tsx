import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";
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
			<h1 className="h1-bold text-dark100_light900">
				Choose a new password
			</h1>
			<p className="base-medium text-dark500_light500">
				Enter your new password to complete the password reset process.
			</p>
			<Separator className="my-6" />
			<ResetPasswordForm email={savedEmail!} />
			<Separator className="my-6" />
		</>
	);
};

export default ResetPasswordPage;
