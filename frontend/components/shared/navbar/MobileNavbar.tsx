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
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavContent = () => {
	const pathName = usePathname();

	return (
		<section className="flex h-full flex-col gap-6 pt-16">
			{sidebarLinks.map((sidebarLink) => {
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
							} flex items-center justify-start gap-4 bg-transparent p-4`}
						>
							<sidebarLink.icon className="w-5" />
							<p
								className={`${
									isActive ? "base-bold" : "base-medium"
								}`}
							>
								{sidebarLink.label}
							</p>
						</Link>
					</SheetClose>
				);
			})}
		</section>
	);
};

const MobileNavbar = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<div className="rounded p-1 border light-border-2 mx-3 md:hidden cursor-pointer">
					<Menu className="w-5 h-5 text-dark100_light900" />
				</div>
			</SheetTrigger>
			<SheetContent
				side="left"
				className="background-light900_dark200 light-border-2"
			>
				<SheetTitle />
				<SheetDescription />
				<Logo className="h-12 w-auto" />
				<div>
					<SheetClose asChild>
						<NavContent />
					</SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNavbar;
