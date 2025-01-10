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

export const registerSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name must be at least 3 characters." })
		.trim(),
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters." })
		.trim(),
	email: z.string().email({ message: "Invalid email address." }).trim(),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters." })
		.trim(),
});

export const loginSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
	password: z.string().min(1, { message: "Password is required." }),
});

export const forgotPasswordSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
});

export const forgotPasswordCodeSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
	code: z.string().length(6, { message: "Invalid code." }),
});

export const resetPasswordSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters." })
		.trim(),
});
