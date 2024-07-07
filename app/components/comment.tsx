import getSession from "@/lib/session";
import { getComment } from "../posts/[id]/action";
import AddComment from "./addComment";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import db from "@/lib/db";

export default async function Comment({ postId }: { postId: number }) {
    const session = await getSession();
    const getCachedComment = nextCache(getComment, [`post-comment-${postId}`], { tags: [`post-comment-${postId}`] });
    const getUser = async () => {
        const user = await db.user.findUnique({
            where: {
                id: session.id
            },
            select: {
                username: true,
                avatar: true
            }
        });

        return user;
    }
    const getCachedUser = nextCache(getUser, [`user-comment-${session.id}`], {revalidate: 60});
    const comments = await getCachedComment(postId);
    const user = await getCachedUser();
    
    return <div>
        <AddComment comments={comments} postId={postId} userId={session.id!} username={user?.username ?? ""} avatar={user?.avatar ?? ""} />
    </div>
}