import { z } from "zod";

const requiredStringSchema = (field: string) =>
  z.string().trim().min(1, `${field} is required`);

export const signUpSchema = z.object({
  email: requiredStringSchema("email").email("Invalid email address"),
  username: requiredStringSchema("username").regex(/^[a-zA-Z0-9_]+$/, {
    message: "Only letters, numbers, and underscores are allowed",
  }),
  password: requiredStringSchema("password").min(
    8,
    "Password must be at least 8 characters",
  ),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredStringSchema("username"),
  password: requiredStringSchema("password"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredStringSchema("content"),
});
