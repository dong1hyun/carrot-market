"use server"

import {
    PASSWORD_MIN_LENGTH,
    PASSWORD_REGEX,
    PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { boolean, z } from "zod"
import bcrypt from "bcrypt"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkPasswords = ({ password, confirm_password }: { password: string, confirm_password: string }) => password === confirm_password;
const checkUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username
        },
        select: {
            id: true
        }
    });
    return !Boolean(user);
}
const checkEmail = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email
        },
        select: {
            id: true
        }
    })
    return !Boolean(user)
}
const formSchema = z
    .object({
        username: z
            .string({
                invalid_type_error: "Username must be a string!",
                required_error: "Where is my username???",
            })
            .trim()
            .toLowerCase()
            // .transform((username) => `🔥 ${username}`)
            .refine(
                (username) => !username.includes("potato"),
                "No potatoes allowed!"
            )
            .refine(
                checkUsername,
                "This username is already taken"
            ),
        email: z.string().email().toLowerCase()
        .refine(checkEmail, "There is an account already registered with that email"),
        password: z
            .string()
            .min(PASSWORD_MIN_LENGTH)
            .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
        confirm_password: z
            .string()
            .min(PASSWORD_MIN_LENGTH),
    })
    .refine(checkPasswords, {
        message: "Both passwords should be the same!",
        path: ["confirmPassword"]
    })

export async function createAccount(prevState: any, formData: FormData) {
    console.log(cookies());
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    };
    const result = await formSchema.safeParseAsync(data);
    if (!result.success) {
        console.log(result.error.flatten())
        return result.error.flatten();
    } else {
        const hashedPassword = await bcrypt.hash(result.data.password, 12);
        // console.log(hashedPassword);
        const user = await db.user.create({
            data: {
                username: result.data.username,
                email: result.data.email,
                password: hashedPassword
            },
            select: {
                id: true
            }
        })

        // iron session "delicious-karrot"이라는 쿠키가 있는지 찾고 없다면 생성해줌
        // 그리고 쿠키 안에 정보를 넣고(cookie.id = user.id) save()로 저장함
        // 그럼 iron session이 우리가 넣은 password를 통해 암호화 함

        const session = await getSession();
        session.id = user.id;
        await session.save();

        redirect("/profile");
    }
}