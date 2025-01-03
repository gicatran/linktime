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
			username: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof registerSchema>) {
		setIsSubmitting(true);

		try {
			const res = await register({
				name: values.name,
				username: values.username,
				email: values.email,
				password: values.password,
			});

			if (res.error) {
				return form.setError("password", {
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
								<Input
									placeholder="Full Name"
									{...field}
									Icon={UserRound}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Username"
									{...field}
									Icon={UserRound}
								/>
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
								<Input
									placeholder="Email"
									{...field}
									Icon={Mail}
								/>
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
								<Input
									placeholder="Password"
									type="password"
									{...field}
									Icon={Lock}
								/>
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
