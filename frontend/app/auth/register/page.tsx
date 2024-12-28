import RegisterForm from "@/components/forms/RegisterForm";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const RegisterPage = () => {
	return (
		<>
			<h1 className="title">Create an Account</h1>
			<p className="subtitle">
				First time around? Select method to register and start explore!
			</p>
			{/* OAuth Login */}
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
