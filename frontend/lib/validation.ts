import { z } from "zod";

export type RegisterFormState =
	| {
			error?: {
				name?: string[];
				email?: string[];
				password?: string[];
				confirmPassword?: string[];
			};
			message?: string;
	  }
	| undefined;

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(3, { message: "Name must be at least 3 characters." })
			.trim(),
		email: z.string().email({ message: "Invalid email address." }),
		password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters." }),
		confirmPassword: z.string(),
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: "custom",
				message: "Password and confirm password do not match.",
				path: ["confirmPassword"],
			});
		}
	});

export const loginSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
	password: z.string().min(1, { message: "Password is required." }),
	remember: z.boolean(),
});
