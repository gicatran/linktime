import React from "react";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { logout } from "@/lib/actions/account.action";

const Navbar = () => {
	return (
		<nav className="flex justify-between mx-[10%]">
			<Logo type="icon" className="h-12" />
			<Button onClick={logout}>Logout</Button>
		</nav>
	);
};

export default Navbar;
