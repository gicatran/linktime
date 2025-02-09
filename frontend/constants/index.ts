import { NavLink, SidebarGroup, Theme } from "@/types";
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
		link: "/users",
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

export const sidebarGroups: SidebarGroup[] = [
	{
		label: "Personal",
		links: [
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
		],
	},
	{
		label: "Community",
		links: [
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
		],
	},
	{
		label: "Media",
		links: [
			{
				link: "/saved",
				icon: Bookmark,
				label: "Saved",
			},
		],
	},
	{
		label: "Other",
		links: [
			{
				link: "/settings",
				icon: Settings,
				label: "Settings",
			},
		],
	},
];

export const profileLinks: NavLink[] = [
	{
		link: "/:username",
		label: "Posts",
	},
	{
		link: "/:username/about",
		label: "About",
	},
	{
		link: "/:username/friends",
		label: "Friends",
	},
	{
		link: "/:username/photos",
		label: "Photos",
	},
	{
		link: "/:username/videos",
		label: "Videos",
	},
	{
		link: "/:username/more",
		label: "More",
	},
];
