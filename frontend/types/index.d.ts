import { LucideIcon } from "lucide-react";

export type UserInfo = {
	id: number;
	username: string;
	profile_picture: string;
	cover_image: string;
	bio: string | null;
	created_at: string;
	updated_at: string;
	account_id: number;
	name: string;
	status: string;
	role: "admin" | "user";
};

export type NavLink = {
	link: string;
	label?: string;
	icon?: LucideIcon;
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
