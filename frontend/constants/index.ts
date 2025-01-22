import { NavLink, SidebarLink, Theme } from "@/types";
import {
	Bookmark,
	ChartSpline,
	CircleUserRound,
	Computer,
	Handshake,
	House,
	Mail,
	Moon,
	Settings,
	Sun,
	UsersRound,
	Video,
} from "lucide-react";

export const themes: Theme[] = [
	{ value: "light", label: "Light", icon: Sun },
	{ value: "dark", label: "Dark", icon: Moon },
	{ value: "system", label: "System", icon: Computer },
];

export const navLinks: NavLink[] = [
	{
		link: "/",
		icon: House,
	},
	{
		link: "/browse/users",
		icon: CircleUserRound,
	},
	{
		link: "/groups",
		icon: UsersRound,
	},
	{
		link: "/videos",
		icon: Video,
	},
];

export const sidebarLinks: SidebarLink[] = [
	{
		link: "/profile/analytics",
		icon: ChartSpline,
		label: "Analytics",
	},
	{
		link: "/messages",
		icon: Mail,
		label: "Messages",
	},
	{
		link: "/friends",
		icon: Handshake,
		label: "Friends",
	},
	{
		link: "/groups",
		icon: UsersRound,
		label: "Groups",
	},
	{
		link: "/videos",
		icon: Video,
		label: "Videos",
	},
	{
		link: "/saved",
		icon: Bookmark,
		label: "Saved",
	},
	{
		link: "/settings",
		icon: Settings,
		label: "Settings",
	},
];
