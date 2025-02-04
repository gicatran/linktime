import RegisterForm from "@/components/forms/RegisterForm";
import OAuthButton from "@/components/shared/OAuthButton";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Register",
	description: "Create an account with Linktime to start exploring.",
};

const RegisterPage = () => {
	return (
		<>
			<h1 className="h1-bold text-dark100_light900">Create an account</h1>
			<p className="base-medium text-dark500_light500">
				First time around? Select method to register and start explore!
			</p>
			<div className="flex justify-evenly items-center w-full mt-3">
				<OAuthButton method="google" />
				<OAuthButton method="facebook" />
			</div>
			<Separator className="my-6" />
			<RegisterForm />
			<Separator className="my-6" />
			<p className="text-center body-regular text-dark100_light900">
				Already have an account?{" "}
				<Link
					href={"/auth/login"}
					className="text-primary-500 body-semibold"
				>
					Login
				</Link>
			</p>
		</>
	);
};

export default RegisterPage;
