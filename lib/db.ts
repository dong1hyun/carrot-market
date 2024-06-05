import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
    const token = await db.product.create({
        data: {
            title: "김밥",
            price: 5000,
            photo: "/kimbab.jpg",
            description: "맛있는 고구마!!!",
            user: {
                connect: {
                    id: 1
                }
            }
        }
    })
}

// test()
export default db