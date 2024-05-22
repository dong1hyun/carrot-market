import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
    const token = await db.product.create({
        data: {
            title: "오뎅",
            price: 1000,
            photo: "/odeng.jpg",
            description: "맛있는 오뎅!!!",
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