import getSession from "@/lib/session";
import { getComment } from "../posts/[id]/action";
import AddComment from "./addComment";
import { unstable_cache as nextCache } from "next/cache";

export default async function Comment({ postId }: { postId: number }) {
    const getCachedComment = nextCache(getComment, ["post-comment"], { tags: [`post-comment-${postId}`] });
    const comments = await getCachedComment();
    const session = await getSession();
    return <div>
        <AddComment comments={comments} postId={postId} userId={session.id!} />
    </div>
}