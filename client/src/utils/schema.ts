import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be of three characters"),
  email: z.string().email(" Invalid Email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Za-z]/, "Password must contain a letter")
    .regex(/\d/, "Password must contain a number"),
  phone: z
    .string()
    .length(10, "Phone must be of exactly 10 digits")
    .regex(/^[0-9]+$/, "Phone must contain only digits"),
  age: z.coerce
    .number()
    .min(5, "Age must be greater than 5")
    .max(80, "Age must be not more that 80"),
  gender: z.enum(["male", "female"], {
    error: () => ({ message: "Select a valid gender" }),
  }),
  position: z.enum(
    [
      "left-wing",
      "right-wing",
      "center",
      "right-forward",
      "left-forward",
      "pivot",
      "goalkeeper",
    ],
    {
      error: () => ({ message: "Please select a valid position" }),
    }
  ),
});

export const loginSchema = z.object({
  email: z.string().email(" Invalid Email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Za-z]/, "Password must contain a letter")
    .regex(/\d/, "Password must contain a number"),
});

export const forgotSchema = z.object({
  name: z.string().min(3, "Name must be more than of three characters"),
  email: z.string().email("Invalid email"),
});

export const resetSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Za-z]/, "Password must contain a letter")
    .regex(/\d/, "Password must contain a number"),
});

export const updateSchema = z.object({
  name: z.string().min(3, "Name must be of three characters"),
  email: z.string().email(" Invalid Email"),
  phone: z
    .string()
    .length(10, "Phone must be of exactly 10 digits")
    .regex(/^[0-9]+$/, "Phone must contain only digits"),
  age: z.coerce
    .number()
    .min(5, "Age must be greater than 5")
    .max(80, "Age must be not more that 80"),
  gender: z.enum(["male", "female"], {
    error: () => ({ message: "Select a valid gender" }),
  }),
  position: z.enum(
    [
      "left-wing",
      "right-wing",
      "center",
      "right-forward",
      "left-forward",
      "pivot",
      "goalkeeper",
    ],
    {
      error: () => ({ message: "Please select a valid position" }),
    }
  ),
});
