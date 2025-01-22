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
import { Bell, Mail } from "lucide-react";
import MobileNavbar from "./MobileNavbar";

const Navbar = async () => {
	const user = await getProfile();

	return (
		<nav className="flex justify-between items-center px-[10%] h-14 background-light900_dark200 border-b light-border-2">
			<div className="flex items-center gap-3 py-3 h-full w-80">
				<Logo type="icon" className="w-10 h-10" />
				<Separator orientation="vertical" />
				<GlobalSearch />
			</div>
			<div className="hidden h-full w-full justify-center gap-3 md:flex">
				{navLinks.map((navLink) => {
					"use client";

					return (
						<Link
							key={navLink.link}
							href={navLink.link}
							className="flex items-center justify-center aspect-square border-b-2 border-primary-500"
						>
							<navLink.icon className="text-dark100_light900" />
						</Link>
					);
				})}
			</div>
			<div className="flex items-center justify-end gap-3 h-full py-3 w-80">
				<ThemeSwitcher />
				<Separator orientation="vertical" />
				<Mail className="text-dark100_light900 w-5 h-5 mx-2" />
				<Bell className="text-dark100_light900 w-5 h-5 mx-2" />
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src={user.profile_picture} />
							<AvatarFallback>
								{getAbbrName(user.name)}
							</AvatarFallback>
						</Avatar>
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
			<MobileNavbar />
		</nav>
	);
};

export default Navbar;
