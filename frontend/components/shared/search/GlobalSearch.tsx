"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";

const GlobalSearch = () => {
	return (
		<Button variant={"ghost"} className="w-fit h-fit">
			<Search className="w-5 h-5 text-dark100_light900" />
		</Button>
	);
};

export default GlobalSearch;
