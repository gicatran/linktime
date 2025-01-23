import { LucideIcon } from "lucide-react";

export type UserInfo = {
	id: number;
	username: string;
	profile_picture: string;
	bio: string | null;
	created_at: string;
	updated_at: string;
	account_id: number;
	name: string;
};

export type NavLink = {
	link: string;
	icon: LucideIcon;
};

type SidebarLink = {
	link: string;
	icon: LucideIcon;
	label: string;
};

export type SidebarGroup = {
	label: string;
	links: SidebarLink[];
};

export type Theme = {
	value: "light" | "dark" | "system";
	label: string;
	icon: LucideIcon;
};
