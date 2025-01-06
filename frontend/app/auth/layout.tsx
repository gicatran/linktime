import Image from "next/image";
import React, { PropsWithChildren } from "react";
import authBg from "@/public/assets/images/auth_bg.png";
import Logo from "@/components/shared/Logo";

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex h-screen">
			<div className="w-1/2 flex justify-center items-center">
				<div className="flex flex-col items-center">
					<Logo className="h-14 w-auto" />
					{children}
				</div>
			</div>
			<Image
				src={authBg}
				alt="background"
				className="w-1/2 object-cover"
			/>
		</div>
	);
};

export default AuthLayout;
