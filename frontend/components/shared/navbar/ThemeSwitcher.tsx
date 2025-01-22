"use client";

import { useTheme } from "@/context/ThemeProvider";
import React from "react";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { Moon, Sun } from "lucide-react";
import { themes } from "@/constants";

const ThemeSwitcher = () => {
	const { mode, setMode } = useTheme();

	return (
		<Menubar className="border-none px-0">
			<MenubarMenu>
				<MenubarTrigger className="cursor-pointer">
					{mode === "light" ? (
						<Sun className="w-5 h-5 text-dark100_light900" />
					) : (
						<Moon className="w-5 h-5 text-dark100_light900" />
					)}
				</MenubarTrigger>
				<MenubarContent className="absolute right-[-3rem] min-w-[120px]">
					{themes.map((theme) => (
						<MenubarItem
							key={theme.value}
							className="flex items-center gap-4 px-2.5 py-2"
							onClick={() => {
								setMode(theme.value);

								if (theme.value !== "system") {
									localStorage.theme = theme.value;
								} else {
									localStorage.removeItem("theme");
								}
							}}
						>
							<theme.icon
								className={`w-4 h-4 ${
									mode === theme.value
										? "active-theme"
										: "text-dark100_light900"
								}`}
							/>
							<p
								className={`body-semibold ${
									mode === theme.value
										? "active-theme"
										: "text-dark100_light900"
								}`}
							>
								{theme.label}
							</p>
						</MenubarItem>
					))}
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};

export default ThemeSwitcher;
