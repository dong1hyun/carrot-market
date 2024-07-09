import ProductList from "@/app/components/product-list";
import { PlusIcon } from "@heroicons/react/16/solid";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import { getInitialProducts } from "./actions";
import { getMyProduct } from "../profile/action";

const getCachedProducts = nextCache(getInitialProducts, ["home-products"], {tags: ["home-products"]});

export const metadata = {
  title: "Home",
};

// export const dynamic = "force-dynamic";
// export const revalidate = 5;

export default async function Products() {
  const initialProducts = await getMyProduct(3);
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