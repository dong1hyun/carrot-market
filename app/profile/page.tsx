import db from "@/lib/db"
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
    // User가 profile 페이지로 이동할 때 browser로부터 cookie를 받음
    // getSession function은 쿠키를 찾고
    // password를 이용해서  decrypt하고 ID를 돌려줌
    const session = await getSession();
    if (session.id) {
        const user = await db.user.findUnique({
            where: {
                id: session.id
            }
        })
        if (user) return user;
    }
    notFound();
}
export default async function Profile() {
    const user = await getUser();
    const logOut = async () => {
        "use server"
        const session = await getSession();
        await session.destroy();
        redirect("/");
    }
    return <div>
        <h1>Welcome {user?.username}</h1>
        <form action={logOut}>
            <button>Log out</button>
        </form>
    </div>
}