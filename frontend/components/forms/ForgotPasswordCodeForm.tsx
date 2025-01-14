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
import { KeyRound } from "lucide-react";
import { Input } from "../ui/input";
import { forgotPasswordCodeSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import { forgotPasswordCode } from "@/lib/actions/account.action";
import { useRouter } from "next/navigation";

const ForgotPasswordCodeForm = ({ email }: { email: string }) => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof forgotPasswordCodeSchema>>({
		resolver: zodResolver(forgotPasswordCodeSchema),
		defaultValues: {
			email: email,
			code: "",
		},
	});

	async function onSubmit(values: z.infer<typeof forgotPasswordCodeSchema>) {
		setIsSubmitting(true);

		try {
			const res = await forgotPasswordCode(email, values.code);

			if (res.error) {
				return form.setError("code", {
					type: "value",
					message: res.error.message,
				});
			}

			router.push(`/auth/forgot-password/${values.email}/${values.code}`);
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
					name="code"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Code"
									{...field}
									Icon={KeyRound}
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
					{isSubmitting ? "Loading..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
};

export default ForgotPasswordCodeForm;
