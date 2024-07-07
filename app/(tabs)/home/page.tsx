import ListProduct from "@/app/components/productIcon";
import ProductList from "@/app/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/16/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";

const getCachedProducts = nextCache(getInitialProducts, ["home-products"], {tags: ["home-products"]});
async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}
export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;
export const metadata = {
  title: "Home",
};

// export const dynamic = "force-dynamic";
// export const revalidate = 5;

export default async function Products() {
  // revalidatePath("/home");
  const initialProducts = await getCachedProducts();
  // const revalidate = async () => {
  //   "use server";
  //   revalidatePath("/home");
  // };
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <a
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </a>
    </div>
  );
}