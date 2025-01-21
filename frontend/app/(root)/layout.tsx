import Navbar from "@/components/shared/navbar/Navbar";
import React, { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="h-screen flex flex-col background-light850_dark100">
			<Navbar />
			{children}
		</div>
	);
};

export default RootLayout;
