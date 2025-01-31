import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getSession } from "./actions/session.action";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getAbbrName(name: string) {
	return name
		.split(" ")
		.map((word) => word[0])
		.join(".")
		.toUpperCase();
}

export function getYear(date: string) {
	return new Date(date).getFullYear();
}

export async function isCurrentUser(id: number) {
    const session = await getSession();
    return session?.account?.id === id;
}
