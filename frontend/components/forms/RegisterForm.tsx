"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UserRound, Mail, Lock } from "lucide-react";
import { registerSchema } from "@/lib/validation";
import { register } from "@/lib/actions/account.action";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(values: z.infer<typeof registerSchema>) {
		setIsSubmitting(true);

		try {
			const res = await register({
				name: values.name,
				email: values.email,
				password: values.password,
				confirmPassword: values.confirmPassword,
			});

			if (res.error) {
				return form.setError("confirmPassword", {
					type: "value",
					message: res.error.message,
				});
			}

			router.push("/auth/login");
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-3"
				autoComplete="off"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className="flex items-center px-3 py-2 gap-2 border border-input rounded-md">
									<UserRound className="text-gray-500" />
									<Input
										placeholder="Name"
										{...field}
										className="!border-none !p-0 !h-fit !shadow-none focus-visible:ring-0 rounded-none"
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className="flex items-center px-3 py-2 gap-2 border border-input rounded-md">
									<Mail className="text-gray-500" />
									<Input
										placeholder="Email"
										{...field}
										className="!border-none !p-0 !h-fit !shadow-none focus-visible:ring-0 rounded-none"
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className="flex items-center px-3 py-2 gap-2 border border-input rounded-md">
									<Lock className="text-gray-500" />
									<Input
										placeholder="Password"
										type="password"
										{...field}
										className="!border-none !p-0 !h-fit !shadow-none focus-visible:ring-0 rounded-none"
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className="flex items-center px-3 py-2 gap-2 border border-input rounded-md">
									<Lock className="text-gray-500" />
									<Input
										placeholder="Confirm Password"
										type="password"
										{...field}
										className="!border-none !p-0 !h-fit !shadow-none focus-visible:ring-0 rounded-none"
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="!mt-5 w-full"
					disabled={isSubmitting}
				>
					Register
				</Button>
			</form>
		</Form>
	);
};

export default RegisterForm;
