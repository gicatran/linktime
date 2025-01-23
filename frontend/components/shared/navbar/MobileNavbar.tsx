"use client";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";
import Logo from "../Logo";
import { sidebarGroups } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserInfo } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAbbrName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/account.action";

const NavContent = ({ user }: { user: UserInfo }) => {
	const pathName = usePathname();

	return (
		<section className="flex h-fit flex-col gap-3 py-8">
			<Link
				href="/profile"
				className="text-dark300_light900 flex items-center justify-start gap-4 bg-transparent p-4 hover:background-light800_dark300 rounded-lg"
			>
				<Avatar className="h-8 w-8">
					<AvatarImage src={user.profile_picture} />
					<AvatarFallback>{getAbbrName(user.name)}</AvatarFallback>
				</Avatar>
				<p className="base-medium">{user.name}</p>
			</Link>

			{sidebarGroups.map((sidebarGroup) => (
				<div key={sidebarGroup.label} className="flex flex-col gap-3">
					<p className="uppercase text-dark400_light500">
						{sidebarGroup.label}
					</p>
					{sidebarGroup.links.map((sidebarLink) => {
						const isActive =
							(pathName.includes(sidebarLink.link) &&
								sidebarLink.link.length > 1) ||
							pathName === sidebarLink.link;

						return (
							<SheetClose asChild key={sidebarLink.link}>
								<Link
									href={sidebarLink.link}
									className={`${
										isActive
											? "primary-gradient rounded-lg text-light-900"
											: "text-dark300_light900"
									} flex items-center justify-start gap-4 bg-transparent p-4 hover:background-light800_dark300 rounded-lg`}
								>
									<sidebarLink.icon className="w-8" />
									<p
										className={`${
											isActive
												? "base-bold"
												: "base-medium"
										}`}
									>
										{sidebarLink.label}
									</p>
								</Link>
							</SheetClose>
						);
					})}
				</div>
			))}
		</section>
	);
};

const MobileNavbar = ({ user }: { user: UserInfo }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<div className="rounded p-1 border light-border-2 mx-3 lg:hidden cursor-pointer">
					<Menu className="w-5 h-5 text-dark100_light900" />
				</div>
			</SheetTrigger>
			<SheetContent
				side="left"
				className="background-light900_dark200 light-border-2"
			>
				<SheetTitle />
				<SheetDescription />
				<div className="flex flex-col h-full">
					<Logo className="h-12 w-auto" />
					<div className="flex-1 justify-between flex flex-col">
						<NavContent user={user} />
						<SheetClose asChild>
							<Button
								onClick={logout}
								size="lg"
								className="w-full"
							>
								Logout
							</Button>
						</SheetClose>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNavbar;
