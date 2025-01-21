import blogImg from "@/public/assets/images/auth_bg.png";
import Image from "next/image";

const HomePage = () => {
	const blogPosts = [
		{
			id: 1,
			img: blogImg,
			title: "Okkkkkkkk",
			date: "May 14, 2019",
		},
		{
			id: 2,
			img: blogImg,
			title: "Okkkkkkkk",
			date: "May 14, 2019",
		},
		{
			id: 3,
			img: blogImg,
			title: "Okkkkkkkk",
			date: "May 14, 2019",
		},
		{
			id: 4,
			img: blogImg,
			title: "Okkkkkkkk",
			date: "May 14, 2019",
		},
		{
			id: 5,
			img: blogImg,
			title: "Okkkkkkkk",
			date: "May 14, 2019",
		},
		{
			id: 6,
			img: blogImg,
			title: "Okkkkkkkk",
			date: "May 14, 2019",
		},
	];

	return (
		<div className="px-[10%] py-10">
			<div className="flex gap-10">
				<div className="flex flex-col p-3 background-light900_dark200 rounded min-w-72 gap-3">
					<h1 className="h2-bold text-dark100_light900">Blog</h1>
					{blogPosts.map((blogPost) => {
						return (
							<div
								key={blogPost.id}
								className="flex items-center gap-3"
							>
								<Image
									src={blogPost.img}
									alt="img"
									className="w-16 h-16 rounded border light-border-2"
								/>
								<div className="flex flex-col">
									<p className="paragraph-semibold text-dark100_light900">
										{blogPost.title}
									</p>
									<p className="body-regular text-dark500_light500">
										{blogPost.date}
									</p>
								</div>
							</div>
						);
					})}
				</div>
				<div className="flex flex-col shrink">
					<h1 className="font-bold text-2xl">Activity Feed</h1>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
