import React from "react";
import Logo from "../Logo";
import { getProfile } from "@/lib/actions/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { getAbbrName } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../../ui/button";
import { logout } from "@/lib/actions/account.action";
import { navLinks } from "@/constants";
import GlobalSearch from "../search/GlobalSearch";
import { Separator } from "@/components/ui/separator";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = async () => {
	const user = await getProfile();

	return (
		<nav className="flex justify-between items-center px-[10%] border border-b h-16">
			<Logo type="icon" className="w-14 h-14" />
			<div className="flex gap-3 h-full">
				{navLinks.map((navLink) => {
					"use client";

					return (
						<Link
							key={navLink.link}
							href={navLink.link}
							className="flex items-center justify-center px-5 aspect-square border-b-2 border-black"
						>
							<navLink.icon />
						</Link>
					);
				})}
			</div>
			<div className="flex items-center gap-3 h-full py-3">
				<GlobalSearch />
				<Separator orientation="vertical" />
				<ThemeSwitcher />
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
			</div>
		</nav>
	);
};

export default Navbar;
