"use client";

import React from "react";
import { Button } from "../ui/button";
import { capitalize } from "@/lib/utils";
import { useRouter } from "next/navigation";
import googleIcon from "@/public/assets/icons/google.svg";
import facebookIcon from "@/public/assets/icons/facebook.svg";
import Image from "next/image";

const OAuthButton = ({ method }: { method: "google" | "facebook" }) => {
	const router = useRouter();

	const redirectToOAuth = async () => {
		router.push(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${method}/callback`
		);
	};

	const getIcon = () => {
		if (method === "google") {
			return googleIcon;
		} else if (method === "facebook") {
			return facebookIcon;
		}
	};

	return (
		<Button onClick={redirectToOAuth} variant="outline">
			<Image
				src={getIcon()}
				alt="icon"
				className="w-5 h-5 object-contain"
			/>
			Continue with {capitalize(method)}
		</Button>
	);
};

export default OAuthButton;
