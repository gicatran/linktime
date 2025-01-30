"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const GlobalSearch = () => {
	return (
		<>
			<div className="relative w-full max-w-56 max-xl:hidden">
				<Input
					type="text"
					placeholder="Search globally"
					defaultValue=""
					className="paragraph-regular no-focus text-dark400_light700"
					containerClassName="background-light700_dark400 border-0 relative grow rounded-xl"
					iconClassName="cursor-pointer"
					Icon={Search}
				/>
			</div>
			<div className="flex items-center justify-center cursor-pointer p-2 rounded-full background-light700_dark400 xl:hidden">
				<Search className="w-5 h-5 text-dark400_light700" />
			</div>
		</>
	);
};

export default GlobalSearch;
