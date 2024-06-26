"use server"

import { z } from "zod";
import fs from "fs/promises"
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const productSchema = z.object({
    photo: z.string({
        required_error: "Photo is required"
    }),
    title: z.string({
        required_error: "title is required"
    }),
    description: z.string({
        required_error: "description is required"
    }),
    price: z.coerce.number({
        required_error: "price is required"
    }),
});

export async function update(prev: any, formData:FormData) {
    const prevPhoto = formData.get("prevPhoto");
    const data = {
        photo: formData.get("photo"),
        title: formData.get("title"),
        price: formData.get("price"),
        description: formData.get("description"),
        productId: formData.get("productId")
    };
    if(prevPhoto) data.photo = prevPhoto;
    if(data.photo instanceof File) {
        const photoData = await data.photo.arrayBuffer();
        await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
        data.photo = `/${data.photo.name}`; 
    }
    const result = productSchema.safeParse(data);
    console.log(formData)
    if(!result.success) {
        return result.error.flatten();
    } else {
        const session = await getSession();
        if(session.id){
            const product = await db.product.update({
                where: {id: Number(data.productId)},
                data: {
                    title: result.data.title,
                    description: result.data.description,
                    price: result.data.price,
                    photo: result.data.photo,
                    user: {
                        connect: {
                            id: session.id
                        }
                    }
                },
                select: {
                    id: true
                }
            });
            
        }
    }
}

// 유저가 이미지를 업로드 했는지
// 이미지 사이즈가 3~4mb 이하