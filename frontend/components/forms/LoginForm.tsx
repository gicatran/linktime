"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "../ui/form";
import { Lock, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import Link from "next/link";
import { loginSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import { login } from "@/lib/actions/account.action";
import { useRouter } from "next/navigation";

const LoginForm = () => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			remember: false,
		},
	});

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		setIsSubmitting(true);

		try {
			const res = await login({
				email: values.email,
				password: values.password,
				remember: values.remember,
			});

			if (res.error) {
				return form.setError("password", {
					type: "value",
					message: res.error.message,
				});
			}

			router.push("/");
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
				<div className="flex justify-between items-center">
					<FormField
						control={form.control}
						name="remember"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div className="flex items-center gap-2">
										<Checkbox
											id="remember"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
										<Label htmlFor="remember">
											Remember me
										</Label>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Link
						href={"/auth/forgot-password"}
						className="text-blue-500 font-semibold"
					>
						Forgot Password?
					</Link>
				</div>
				<Button
					type="submit"
					className="!mt-5 w-full"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Loading..." : "Login"}
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
