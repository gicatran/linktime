import Image from "next/image";
import Link from "next/link";
import authBg from "@/public/assets/images/logo_icon.png";

const Logo = () => {
	return (
		<Link href={"/"}>
			<Image
				src={authBg}
				alt="logo"
				height={100}
				className="object-contain"
			/>
		</Link>
	);
};

export default Logo;
