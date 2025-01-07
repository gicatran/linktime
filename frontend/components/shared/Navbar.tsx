import React from "react";
import Logo from "./Logo";
import { getSession } from "@/lib/actions/session.action";
import { getProfile } from "@/lib/actions/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getAbbrName } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { logout } from "@/lib/actions/account.action";

const Navbar = async () => {
	let user = null;
	const session = await getSession();
	if (session?.account) {
		user = await getProfile();
	}

	return (
		<nav className="flex justify-between items-center px-[10%] py-2 border border-b">
			<Logo type="icon" className="w-12 h-12" />
			{user && (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<div className="flex items-center p-1">
							<p className="mr-3">{user.name}</p>
							<Avatar>
								<AvatarImage src={user.profile_picture} />
								<AvatarFallback>
									{getAbbrName(user.name)}
								</AvatarFallback>
							</Avatar>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href="/profile">Profile</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<Button onClick={logout} className="w-full">
							Logout
						</Button>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</nav>
	);
};

export default Navbar;
