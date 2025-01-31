import ForgotPasswordCodeForm from "@/components/forms/ForgotPasswordCodeForm";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const ForgotPasswordCodePage = async () => {
	const savedEmail = (await cookies()).get("resetPassword_email")?.value;

	if (savedEmail === undefined) {
		redirect("/auth/forgot-password");
	}

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">Enter reset code</h1>
			<p className="base-medium text-dark500_light500">
				Enter the code sent to your email to reset your password.
			</p>
			<Separator className="my-6" />
			<ForgotPasswordCodeForm email={savedEmail!} />
			<Separator className="my-6" />
		</>
	);
};

export default ForgotPasswordCodePage;
