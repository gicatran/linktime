import { LucideIcon } from "lucide-react";

type NavLink = {
	link: string;
	icon: LucideIcon;
};

type SidebarLink = {
	link: string;
	icon: LucideIcon;
	label: string;
};

type Theme = {
	value: "light" | "dark" | "system";
	label: string;
	icon: LucideIcon;
};
