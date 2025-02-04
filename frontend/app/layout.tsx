import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: { default: "Linktime", template: "%s | Linktime" },
	description: "A social media platform for users to share about their life.",
	applicationName: "Linktime",
	authors: [{ name: "Gica", url: "https://github.com/gicatran" }],
	generator: "Next.js",
	keywords: ["social", "media", "platform", "share", "nextjs"],
	referrer: "origin-when-cross-origin",
	creator: "Gica",
	publisher: "Gica",
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable} antialiased`}>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
