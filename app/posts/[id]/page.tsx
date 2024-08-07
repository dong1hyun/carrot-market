import LikeButton from "@/app/components/like-button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon } from "@heroicons/react/16/solid";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import Comment from "@/app/components/comment";

async function getPost(id: number) {
    try {
        const post = await db.post.update({
            where: { id },
            data: {
                views: {
                    increment: 1
                }
            },
            include: {
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    }
                },
                _count: {
                    select: {
                        comments: true,
                    }
                }
            },
        });
        return post;
    } catch (e) {
        return null;
    }
}

export default async function PostDetail({ params }: { params: { id: string } }) {
    const getCachedPost = nextCache(getPost, [`post-detail-${params.id}`], { tags: [`post-detail-${params.id}`], revalidate: 60 });
    const postId = Number(params.id);
    if (isNaN(postId)) {
        return notFound();
    }
    const post = await getCachedPost(postId);
    if (!post) {
        return notFound();
    }
    async function getLikeStatus(postId: number, userId: number) {
        const isLiked = await db.like.findUnique({
            where: {
                id: {
                    postId,
                    userId
                }
            }
        });
        const likeCount = await db.like.count({
            where: {
                postId
            }
        });
        return { likeCount, isLiked: Boolean(isLiked) }
    }
    const getCachedLikeStatus = async () => {
        const session = await getSession();
        const cacheLike = nextCache(getLikeStatus, [`like-status-${postId}`],{ tags: [`like-status-${postId}`]});
        return cacheLike(postId, session.id!);
    }
    const {likeCount, isLiked} = await getCachedLikeStatus();
    return (
        <div className="p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
                <Image
                    width={28}
                    height={28}
                    className="size-7 rounded-full"
                    src={post.user.avatar!}
                    alt={post.user.username}
                />
                <div>
                    <span className="text-sm font-semibold">{post.user.username}</span>
                    <div className="text-xs">
                        <span>{formatToTimeAgo(post.created_at.toString())}</span>
                    </div>
                </div>
            </div>
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="mb-5">{post.description}</p>
            <div className="flex flex-col gap-5 items-start">
                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                    <EyeIcon className="size-5" />
                    <span>조회 {post.views}</span>
                </div>
                <LikeButton isLiked={isLiked} likeCount={likeCount} postId={postId} />
            </div>
            <Comment postId={postId} />
        </div>
    );
}