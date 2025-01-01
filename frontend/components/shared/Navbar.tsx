import React from "react";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { logout } from "@/lib/actions/account.action";

const Navbar = () => {
	return (
		<div>
			<Logo />
			<Button onClick={logout}>Logout</Button>
		</div>
	);
};

export default Navbar;
