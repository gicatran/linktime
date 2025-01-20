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
		<Menubar>
			<MenubarMenu>
				<MenubarTrigger>
					{mode === "light" ? (
						<Sun className="w-5 h-5" />
					) : (
						<Moon className="w-5 h-5" />
					)}
				</MenubarTrigger>
				<MenubarContent className="absolute right-[-3rem] min-w-[120px] rounded border">
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
									mode === theme.value && "active-theme"
								}`}
							/>
							<p
								className={`body-semibold ${
									mode === theme.value ? "" : ""
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
