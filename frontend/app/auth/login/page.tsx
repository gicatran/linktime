import LoginForm from "@/components/forms/LoginForm";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/actions/account.action";
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
			{/* OAuth Login */}
			<Separator className="my-6" />
			<LoginForm />
			<p className="my-5">
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
