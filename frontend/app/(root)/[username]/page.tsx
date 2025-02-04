import RightSidebar from "@/components/shared/sidebar/RightSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProfile } from "@/lib/actions/user.action";
import { getAbbrName, getYear, isCurrentUser } from "@/lib/utils";
import { UserInfo } from "@/types";
import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({
	params,
}: {
	params: Promise<{ username: string }>;
}) => {
	const username = (await params).username;
	const user: UserInfo = await getProfile({ username });

	return (
		<div className="flex gap-5">
			<div className="flex flex-col w-full">
				<div className="flex flex-col border border-t-0 light-border-2 rounded-lg rounded-t-none">
					<div className="w-full h-auto aspect-wide background-light850_dark100">
						{user.cover_image && (
							<Image
								src={user.cover_image}
								alt="cover img"
								width={0}
								height={0}
								className="w-full h-auto aspect-wide"
							/>
						)}
					</div>
					<div className="background-light900_dark200 flex flex-col items-center rounded-lg rounded-t-none p-5">
						<Avatar className="h-44 w-44 -mt-20 border-4 border-light-900 dark:border-dark-200">
							<AvatarImage src={user.profile_picture} />
							<AvatarFallback>
								{getAbbrName(user.name)}
							</AvatarFallback>
						</Avatar>
						<h1 className="mt-3 h1-bold text-dark100_light900">
							{user.name}
						</h1>
						<div className="flex justify-between w-full">
							<div className="flex gap-3 w-1/3 items-center">
								<Link
									href={`${user.username}/followers`}
									className="subtitle base-regular"
								>
									<span className="font-semibold text-dark100_light900">
										13
									</span>{" "}
									followers
								</Link>
								<Link
									href={`${user.username}/following`}
									className="subtitle base-regular"
								>
									<span className="font-semibold text-dark100_light900">
										16
									</span>{" "}
									following
								</Link>
							</div>
							<p className="flex subtitle base-regular w-1/3 justify-center items-center">
								@{user.username} • Joined{" "}
								{getYear(user.created_at)}
							</p>
							{(await isCurrentUser(user.account_id)) && (
								<div className="flex justify-end w-1/3 items-center gap-2">
									<Link
										href={`${user.username}/short/new`}
										className="bg-primary-500 text-dark100_light900 rounded py-2 px-3 flex items-center gap-1"
									>
										<Plus className="h-5 w-5" />
										New short
									</Link>
									<Link
										href={`${user.username}/edit`}
										className="background-light700_dark400 text-dark100_light900 rounded py-2 px-3 flex items-center gap-1"
									>
										<Pencil className="h-5 w-5" />
										Edit profile
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<RightSidebar />
		</div>
	);
};

export default ProfilePage;
