import { NavLink, Theme } from "@/types";
import {
	CircleUserRound,
	Computer,
	House,
	Moon,
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
		link: "/browse/groups",
		icon: UsersRound,
	},
	{
		link: "/browse/videos",
		icon: Video,
	},
];
