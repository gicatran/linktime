import Navbar from "@/components/shared/navbar/Navbar";
import SidePanel from "@/components/shared/sidebar/SidePanel";
import React, { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="h-screen flex background-light850_dark100">
			<SidePanel />
			<div className="flex flex-col w-full">
				<Navbar />
				<div className="h-full px-[5%]">{children}</div>
			</div>
		</div>
	);
};

export default RootLayout;
