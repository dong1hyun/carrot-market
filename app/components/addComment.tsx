"use client"

import db from "@/lib/db"
import { useFormState } from "react-dom"
import { addComment } from "../posts/[id]/action";
import { useOptimistic } from "react";
import { z } from "zod";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/16/solid";

interface commentProps {
    id: number,
    payload: string,
    created_at: Date,
    updated_at: Date,
    userId: number,
    postId: number,
    user: {
        username: string,
        avatar: string | null
    }
}

const commentSchema = z.string();
export default function AddComment({ comments, postId, userId }: { comments: commentProps[], postId: number, userId: number }) {
    const [comments_state, reducer] = useOptimistic(comments, (prev, payload: commentProps) => ([payload, ...prev]));
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const result = commentSchema.safeParse(formData.get("comment"));
        reducer({
            id: 0,
            payload: result.data!,
            created_at: new Date(),
            updated_at: new Date(),
            userId: userId,
            postId: postId,
            user: {
                username: "lim",
                avatar: ""
            }
        })
        addComment(result.data!, postId);
    }
    return <div className="mt-5">
        <div className="border-t border-white py-5" />
        <form onSubmit={handleSubmit} className="w-60 relative">
            <input name="comment" className="rounded-md text-black text-sm w-full"
                placeholder="댓글을 작성해보세요." />
            {/* <button className="absolute right-0 text-black align-middle bg-gray-500 rounded-md h-9" type="submit">작성</button> */}
        </form>
        <div className="flex flex-col gap-5 mt-5">
            {comments_state.map(comment => (
                <div key={comment.id} className="p-5 border border-white rounded-md">
                    <div className="flex items-center gap-5 mb-5">
                        <div className="size-10 rounded-full overflow-hidden">
                            {!comment.user.avatar ? <UserIcon /> : <Image src={comment.user.avatar} alt={comment.user.username} width={40} height={40} />}
                        </div>
                        <h3>{comment.user.username}</h3>
                    </div>

                    {comment.payload}
                </div>
            ))}
        </div>
    </div>
}