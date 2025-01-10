import LoginForm from "@/components/forms/LoginForm";
import OAuthButton from "@/components/shared/OAuthButton";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/actions/session.action";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
	const session = await getSession();
	if (session && session.account) {
		redirect("/");
	}

	return (
		<>
			<h1 className="title">Login to your Account</h1>
			<p className="subtitle">
				Welcome back! Select method to login and get back right away!
			</p>
			<div className="flex justify-evenly items-center w-full mt-3">
				<OAuthButton method="google" />
				<OAuthButton method="facebook" />
			</div>
			<Separator className="my-6" />
			<LoginForm />
			<Separator className="my-6" />
			<p className="text-center">
				Don&apos;t have an account?{" "}
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

export default LoginPage;
