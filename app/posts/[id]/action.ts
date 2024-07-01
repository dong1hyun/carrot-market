"use server"

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";

export const likePost = async (postId: number) => {
    "use server"
    await new Promise(resolve => setTimeout(resolve, 5000));
    try {
        const session = await getSession();
        if (!session.id) notFound();
        await db.like.create({
            data: {
                postId,
                userId: session.id
            }
        });
        revalidateTag(`like-status-${postId}`);
    } catch (e) { }
}

export const dislikePost = async (postId: number) => {
    "use server"
    await new Promise(resolve => setTimeout(resolve, 5000));
    try {
        const session = await getSession();
        if (!session.id) notFound();
        await db.like.delete({
            where: {
                id: {
                    postId,
                    userId: session.id
                }
            }
        });
        revalidateTag(`like-status-${postId}`);
    } catch (e) { }
}