"use client";

import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = () => {
	const pathName = usePathname();

	return (
		<div className="hidden h-full w-full justify-center gap-3 md:flex">
			{navLinks.map((navLink) => {
				const isActive =
					(pathName.includes(navLink.link) &&
						navLink.link.length > 1) ||
					pathName == navLink.link;
				const Icon = navLink.icon!;

				return (
					<Link
						key={navLink.link}
						href={navLink.link}
						className={`flex items-center justify-center aspect-square border-b-2 border-t-2 rounded-lg ${
							isActive
								? "border-b-primary-500 border-t-light-900 dark:border-t-dark-200 rounded-none"
								: "border-light-900 dark:border-dark-200 hover:background-light700_dark400"
						}`}
					>
						<Icon
							className={
								isActive
									? "text-primary-500"
									: "text-dark100_light900"
							}
						/>
					</Link>
				);
			})}
		</div>
	);
};

export default NavLinks;
