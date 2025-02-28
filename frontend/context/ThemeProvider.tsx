"use client";

import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";

interface ThemeContextType {
	mode: string;
	setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
	const [mode, setMode] = useState("");

	const handleThemeChange = () => {
		if (mode === "dark") {
			setMode("light");
			document.documentElement.classList.add("light");
		}
		if (mode === "light") {
			setMode("dark");
			document.documentElement.classList.add("dark");
		}
	};

	// useEffect(() => {
	// 	handleThemeChange();
	// }, [mode]);

	return (
		<ThemeContext.Provider value={{ mode, setMode }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);

	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
}
