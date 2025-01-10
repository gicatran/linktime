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
import { Mail } from "lucide-react";
import { Input } from "../ui/input";
import { forgotPasswordSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import { forgotPassword } from "@/lib/actions/account.action";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof forgotPasswordSchema>>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
		setIsSubmitting(true);

		try {
			const res = await forgotPassword(values.email);

			if (res.error) {
				return form.setError("email", {
					type: "value",
					message: res.error.message,
				});
			}

			router.push(`/auth/forgot-password/${values.email}`);
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
				<Button
					type="submit"
					className="w-full"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Loading..." : "Send Code"}
				</Button>
			</form>
		</Form>
	);
};

export default ForgotPasswordForm;
