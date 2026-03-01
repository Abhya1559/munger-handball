import { z } from "zod";

export const registerPlayerSchema = z.object({
  name: z.string().min(1, "name should be greated than 1"),
  email: z.string().endsWith("@gmail.com"),
  password: z
    .string()
    .min(6, "password length is to short")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
  position: z.enum([
    "Goalkeeper",
    "Left Wing",
    "Right Wing",
    "Right Forward",
    "Left Forward",
    "Center",
    "Pivot",
  ]),
  secretKey: z.string().min(4, "secret key must be greater than 6"),
  address: z.object({
    house: z.string().min(1),
    mohalla: z.string().min(1),
    landmark: z.string().min(1),
  }),
  aadhar: z.string().regex(/^\d{12}$/, "Aadhar must be exactly 12 digits"),
});
