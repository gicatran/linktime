import { LucideIcon } from "lucide-react";

type NavLink = {
	link: string;
	icon: LucideIcon;
};

type Theme = {
	value: "light" | "dark" | "system";
	label: string;
	icon: LucideIcon;
};
