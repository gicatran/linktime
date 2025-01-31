import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/actions/session.action";
import { redirect } from "next/navigation";
import React from "react";

const ForgotPasswordPage = async () => {
	const session = await getSession();
	if (session && session.account) {
		redirect("/");
	}

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">
				Forgot your password?
			</h1>
			<p className="base-medium text-dark500_light500">
				Don&apos;t worry! Enter your email and we will send you a reset
				code!
			</p>
			<Separator className="my-6" />
			<ForgotPasswordForm />
			<Separator className="my-6" />
		</>
	);
};

export default ForgotPasswordPage;
