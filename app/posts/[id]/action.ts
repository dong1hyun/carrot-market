"use server"

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag, unstable_cache as nextCache } from "next/cache";
import { notFound } from "next/navigation";
import { useOptimistic } from "react";
import { z } from "zod";

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

const commentSchema = z.object({
    comment: z.string(),
    postId: z.string()
})

export const addComment = async (text:string, postId:number) => {
    "use server"
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const session = await getSession();
    const comment = await db.comment.create({
        data: {
            payload: text,
            user: {
                connect: {
                    id: session.id
                }
            },
            post: {
                connect: {
                    id: +postId
                }
            }
        }
    });
    revalidateTag(`post-comment-${postId}`);
    return comment;
}

export const getComment = async () => {
    const comments = await db.comment.findMany({
        include: {
            user: {
                select: {
                    username: true,
                    avatar: true,
                }
            }
        },
        orderBy: {created_at: 'desc'}
    });
    return comments;
}