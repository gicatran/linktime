import Navbar from "@/components/shared/Navbar";
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
