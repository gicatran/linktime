import Navbar from "@/components/shared/navbar/Navbar";
import React, { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
};

export default RootLayout;
