import { NavLink } from "@/types";
import { CircleUserRound, House, UsersRound, Video } from "lucide-react";

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
