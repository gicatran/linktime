"use client";

import React from "react";
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
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import Link from "next/link";
import { loginSchema } from "@/lib/validation";

const LoginForm = () => {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			remember: false,
		},
	});

	function onSubmit(values: z.infer<typeof loginSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
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
				<Button type="submit" className="!mt-5 w-full">
					Login
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
