import { Metadata } from "next";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "Forgot Password",
	description: "Login to Linktime to start sharing your thoughts!",
};

const ForgotPasswordLayout = ({ children }: PropsWithChildren) => {
	return (
		<>
			{children}
			<p className="text-center text-dark100_light900">
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

export default ForgotPasswordLayout;
