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
import { Lock } from "lucide-react";
import { Input } from "../ui/input";
import { resetPasswordSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import { resetPassword } from "@/lib/actions/account.action";
import { useRouter } from "next/navigation";

const ResetPasswordForm = ({ email }: { email: string }) => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof resetPasswordSchema>>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: email,
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
		setIsSubmitting(true);

		try {
			const res = await resetPassword(email, values.password);

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
					className="w-full"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Loading..." : "Reset Password"}
				</Button>
			</form>
		</Form>
	);
};

export default ResetPasswordForm;
