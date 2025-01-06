import React from "react";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { logout } from "@/lib/actions/account.action";

const Navbar = () => {
	return (
		<nav className="flex justify-between px-[10%] py-2 border border-b">
			<Logo type="icon" className="w-12 h-12" />
			<Button onClick={logout}>Logout</Button>
		</nav>
	);
};

export default Navbar;
