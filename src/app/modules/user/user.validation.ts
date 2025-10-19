import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")  // required
        .max(50, "Name must be at most 50 characters"),
    email: z
        .string().min(5, "Email must be at least 5 characters")
        .max(100, "Email must be at most 50 characters")
        .email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter",
        })
        .regex(/^(?=.*[a-z])/, {
            message: "Password must contain at least 1 lowercase letter",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character (!@#$%^&*)",
        }),
    phone: z
        .string({}) //invalid_type_error: "Phone Number must be string"
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional(),
    address: z
        .string({})//invalid_type_error: "Address must be string"
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional()

})
export const updateUserZodSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")  // required
        .max(50, "Name must be at most 50 characters")
        .optional(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter",
        })
        .regex(/^(?=.*[a-z])/, {
            message: "Password must contain at least 1 lowercase letter",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character (!@#$%^&*)",
        })
        .optional(),
    phone: z
        .string({}) //invalid_type_error: "Phone Number must be string"
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional(),
    role: z
        .enum(Object.values(Role))
        .optional(),
    isActive: z
        .enum(Object.values(IsActive))
        .optional(),
    isDeleted: z
        .boolean({ error: "isDeleted must be true or false" })
        .optional(),
    isVerified: z
        .boolean({ error: "isVerified must be true or false" })
        .optional(),
    address: z
        .string({})//invalid_type_error: "Address must be string"
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional()

})