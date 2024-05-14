"use server"

import { z } from "zod"

const passwordRegex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);
const checkUsername = (username: string) => !username.includes("potato");
const checkPasswords = ({ password, confirmPassword }: { password: string, confirmPassword: string }) =>
    password === confirmPassword;
const formSchema = z.object({
    username: z
        .string({
            invalid_type_error: "Username must be a string!",
            required_error: "Where is my username"
        })
        .min(3, "too short!!")
        .max(10, "too looong!!")
        .trim()
        .toLowerCase()
        .transform(username => `you got it ${username}`)
        .refine(checkUsername, "tomato"),
    email: z
        .string()
        .email()
        .toLowerCase(),
    password: z
        .string()
        .min(4, "too short!!")
        .regex(passwordRegex, "A password must have lowercase, UPPERCASE, a number and special characters"),
    confirmPassword: z
        .string()
        .min(4, "too short!!"),
})
    .refine(checkPasswords, {
        message: "Both passwords should be the same!",
        path: ["confirmPassword"]
    })

export async function createAccount(prevState: any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    }
    const result = formSchema.safeParse(data);
    if (!result.success) {
        return result.error?.flatten();
    } else {
        console.log(result.data)
    }
}