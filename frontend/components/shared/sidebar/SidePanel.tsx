"use client";

import { Separator } from "@/components/ui/separator";
import { sidebarGroups } from "@/constants";
import { PanelLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const SidePanel = () => {
	const pathName = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidePanel = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div
			className={`flex flex-col gap-5 max-lg:hidden background-light900_dark200 px-3 py-2 border-r light-border-2 transition-[width] ${
				isOpen ? "w-56" : "w-[69px]"
			}`}
		>
			<div
				className="w-fit h-fit p-3 hover:background-light800_dark300 rounded-lg cursor-pointer"
				onClick={toggleSidePanel}
			>
				<PanelLeft className="h-5 w-5 text-dark300_light900" />
			</div>
			<div className="flex flex-col">
				{sidebarGroups.map((sidebarGroup, index) => (
					<div key={sidebarGroup.label} className="flex flex-col">
						<div className="flex flex-col gap-2">
							<p
								className={`uppercase text-dark400_light500 body-regular select-none pt-2 ${
									!isOpen ? "hidden" : ""
								}`}
							>
								{sidebarGroup.label}
							</p>
							{sidebarGroup.links.map((sidebarLink) => {
								const isActive =
									(pathName.includes(sidebarLink.link) &&
										sidebarLink.link.length > 1) ||
									pathName === sidebarLink.link;

								return (
									<Link
										key={sidebarLink.link}
										href={sidebarLink.link}
										className={`${
											isActive
												? "primary-gradient rounded-lg text-light-900"
												: "text-dark300_light900"
										} flex items-center justify-start gap-4 select-none bg-transparent ${
											isOpen ? "py-3 px-5" : "p-3"
										} hover:background-light800_dark300 rounded-lg`}
									>
										<sidebarLink.icon className="w-5 h-5" />
										<p
											className={`${
												!isOpen ? "hidden" : ""
											} ${
												isActive
													? "paragraph-bold"
													: "paragraph-medium"
											}`}
										>
											{sidebarLink.label}
										</p>
									</Link>
								);
							})}
						</div>
						{index !== sidebarGroups.length - 1 && (
							<Separator className="my-3" />
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default SidePanel;
