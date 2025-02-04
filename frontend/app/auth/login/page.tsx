import LoginForm from "@/components/forms/LoginForm";
import OAuthButton from "@/components/shared/OAuthButton";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
	title: "Login",
	description: "Login to Linktime to start sharing your thoughts!",
};

const LoginPage = () => {
	return (
		<>
			<h1 className="h1-bold text-dark100_light900">
				Login to your account
			</h1>
			<p className="base-medium text-dark500_light500">
				Welcome back! Select method to login and get back right away!
			</p>
			<div className="flex justify-evenly items-center w-full mt-3">
				<OAuthButton method="google" />
				<OAuthButton method="facebook" />
			</div>
			<Separator className="my-6" />
			<LoginForm />
			<Separator className="my-6" />
			<p className="text-center body-regular text-dark100_light900">
				Don&apos;t have an account?{" "}
				<Link
					href={"/auth/register"}
					className="text-primary-500 body-semibold"
				>
					Register
				</Link>
			</p>
		</>
	);
};

export default LoginPage;
