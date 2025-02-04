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
import GlobalSearch from "../search/GlobalSearch";
import { Separator } from "@/components/ui/separator";
import ThemeSwitcher from "./ThemeSwitcher";
import { Bell, Mail } from "lucide-react";
import MobileNavbar from "./MobileNavbar";
import { UserInfo } from "@/types";
import NavLinks from "./NavLinks";
import { getSession } from "@/lib/actions/session.action";

const Navbar = async () => {
	const session = await getSession();
	const user: UserInfo = await getProfile({ id: session?.account.id });

	return (
		<nav className="flex justify-between items-center px-[5%] h-14 background-light900_dark200 border-b light-border-2">
			<div className="flex items-center gap-3 py-3 h-full w-full max-w-80">
				<Logo type="icon" className="w-9 h-9" />
				<Separator orientation="vertical" />
				<GlobalSearch />
			</div>
			<NavLinks />
			<div className="flex items-center justify-end gap-3 h-full py-3 w-full max-w-80">
				<ThemeSwitcher />
				<Separator orientation="vertical" />
				<Mail className="text-dark100_light900 w-5 h-5 mx-2" />
				<Bell className="text-dark100_light900 w-5 h-5 mx-2" />
				<DropdownMenu>
					<DropdownMenuTrigger className="max-lg:hidden">
						<Avatar>
							<AvatarImage src={user.profile_picture} />
							<AvatarFallback>
								{getAbbrName(user.name)}
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>{user.name}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href={`/${user.username}`}>Profile</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<Button onClick={logout} className="w-full">
							Logout
						</Button>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<MobileNavbar user={user} />
		</nav>
	);
};

export default Navbar;
