"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";

const GlobalSearch = () => {
	return (
		<Button variant={"ghost"}>
			<Search />
		</Button>
	);
};

export default GlobalSearch;
