import RegisterForm from "@/components/forms/RegisterForm";
import OAuthButton from "@/components/shared/OAuthButton";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/actions/session.action";
import Link from "next/link";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
	const session = await getSession();
	if (session && session.account) {
		redirect("/");
	}

	return (
		<>
			<h1 className="title">Create an account</h1>
			<p className="subtitle">
				First time around? Select method to register and start explore!
			</p>
			<div className="flex justify-evenly items-center w-full mt-3">
				<OAuthButton method="google" />
				<OAuthButton method="facebook" />
			</div>
			<Separator className="my-6" />
			<RegisterForm />
			<p className="my-5">
				Already have an account?{" "}
				<Link
					href={"/auth/login"}
					className="text-blue-500 font-semibold"
				>
					Login
				</Link>
			</p>
		</>
	);
};

export default RegisterPage;
