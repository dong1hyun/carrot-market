import ListProduct from "@/app/components/list-product";
import db from "@/lib/db";

async function getProducts() {
    const products = await db.product.findMany({
        select: {
            title: true,
            price: true,
            create_at: true,
            photo: true,
            id: true
        }
    })
    return products;
}

export default async function Products() {
    const products = await getProducts();
    console.log(products)
    return (
        <div>
            {products.map(product => <ListProduct key={product.id}  {...product}  />)}
        </div>
    )
}