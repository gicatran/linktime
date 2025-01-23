import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff, LucideIcon } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
	containerClassName?: string;
	iconClassName?: string;
	Icon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, type, containerClassName, iconClassName, Icon, ...props },
		ref
	) => {
		const [inputType, setInputType] = React.useState(type);

		const togglePasswordVisibility = () => {
			setInputType((prev) => (prev === "password" ? "text" : "password"));
		};

		return (
			<div
				className={`flex items-center px-3 py-2 gap-2 border light-border-2 rounded-md ${containerClassName}`}
			>
				{Icon && (
					<Icon
						className={`text-dark500_light500 ${iconClassName}`}
					/>
				)}
				<input
					type={inputType}
					className={cn(
						"flex rounded-none h-fit w-full border-none p-0 shadow-none bg-transparent paragraph-regular text-dark100_light900 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-dark500_light500 focus-visible:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						className
					)}
					ref={ref}
					{...props}
				/>
				{type === "password" && (
					<button
						type="button"
						onClick={togglePasswordVisibility}
						className="text-dark500_light500 hover:text-dark100_light900"
					>
						{inputType === "password" ? (
							<Eye className="h-5 w-5" />
						) : (
							<EyeOff className="h-5 w-5" />
						)}
					</button>
				)}
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
