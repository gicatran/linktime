import React from "react";
import { Badge } from "@/components/ui/badge";

const UserRoleBadge = ({ role }: { role: string }) => {
	let bgColor = "";
	switch (role) {
		case "admin":
			bgColor = "bg-primary-500";
			break;
		default:
			bgColor = "bg-green-500";
			break;
	}

	return (
		<Badge
			className={`z-30 absolute -bottom-3 left-0 right-0 w-fit mx-auto justify-center capitalize ${bgColor}`}
		>
			{role}
		</Badge>
	);
};

export default UserRoleBadge;
