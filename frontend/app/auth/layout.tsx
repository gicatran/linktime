import Image from "next/image";
import React, { PropsWithChildren } from "react";
import authBg from "@/public/assets/images/auth_bg.png";
import Logo from "@/components/shared/Logo";

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex h-screen relative">
			<div className="w-full flex justify-center items-center xl:w-1/2 ">
				<div className="flex flex-col items-center border rounded-lg px-10 py-20 xl:border-none">
					<Logo className="h-14 w-auto" />
					{children}
				</div>
			</div>
			<Image
				src={authBg}
				alt="background"
				className="w-1/2 object-cover hidden xl:block"
			/>
		</div>
	);
};

export default AuthLayout;
