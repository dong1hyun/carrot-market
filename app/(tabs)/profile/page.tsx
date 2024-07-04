import ProductList from "@/app/components/product-list";
import db from "@/lib/db"
import getSession from "@/lib/session";
import { unstable_cache as nextCache } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { getMyProduct, getUser, logOut } from "./action";
import UpdateProfile from "@/app/components/updateProfile";

export default async function Profile() {
    const session = await getSession();
    if(!session.id) return notFound();
    const user = await getUser(session.id);
    console.log(user);
    const getCachedProduct = nextCache(getMyProduct, ["myProduct"]);
    const myProducts = await getCachedProduct(session.id);
    return <div className="*:border-b *:border-b-gray-400">
        <div className="py-10">
            <h1 className="font-gothic text-5xl">Welcome <span className="text-orange-500">{user?.username}</span></h1>
            <form action={logOut}>
                <button>Log out</button>
            </form>
        </div>
        <div className="py-10">
            <h1 className="font-gothic text-5xl">내 상품 목록</h1>
            <ProductList initialProducts={myProducts} />
        </div>
        <UpdateProfile username={user.username} phone={user.phone} avatar={user.avatar} />
    </div>
}