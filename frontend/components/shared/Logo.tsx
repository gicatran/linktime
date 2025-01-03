import Image from "next/image";
import Link from "next/link";
import logoIcon from "@/public/assets/images/logo_icon.png";
import logoText from "@/public/assets/images/logo_text.png";

const Logo = ({
	type = "text",
	className,
}: {
	type?: "icon" | "text";
	className?: string;
}) => {
	return (
		<Link
			href={"/"}
			className="h-fit w-fit flex justify-center items-center"
		>
			<Image
				src={type === "icon" ? logoIcon : logoText}
				alt="logo"
				height={100}
				className={`object-contain flex justify-center items-center ${className}`}
			/>
		</Link>
	);
};

export default Logo;
