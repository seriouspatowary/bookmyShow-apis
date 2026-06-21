import { z } from "zod";
import { UserRole } from "../models/user.model";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .email("Invalid email"),

  phone: z
    .string()
    .min(10)
    .max(15),

  password: z
    .string(),

  role: z
    .nativeEnum(UserRole)
    .optional()
    .default(UserRole.USER),
});

export type RegisterInput = z.infer<typeof registerSchema>;


/* Login */

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;