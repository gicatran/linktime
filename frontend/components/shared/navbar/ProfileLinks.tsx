"use client";

import { profileLinks } from "@/constants";
import { getDynamicLink } from "@/lib/utils";
import { UserInfo } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProfileLinks = ({ user }: { user: UserInfo }) => {
	const pathName = usePathname();

	return (
		<div className="flex gap-2 mt-2 mb-4">
			{profileLinks.map((profileLink) => {
				const dynamicLink = getDynamicLink(profileLink.link, user);
				const isActive =
					(pathName.includes(dynamicLink) &&
						dynamicLink.length > 1) ||
					pathName == dynamicLink;

				return (
					<Link
						href={dynamicLink}
						key={profileLink.link}
						className={`flex items-center gap-3 p-4 border-y-2 base-regular ${
							isActive
								? "border-b-primary-500 border-t-light-850 dark:border-t-dark-100 text-primary-500"
								: "rounded-lg border-light-850 text-dark100_light900 dark:border-dark-100 hover:background-light700_dark300"
						}`}
					>
						{profileLink.label}
					</Link>
				);
			})}
		</div>
	);
};

export default ProfileLinks;
