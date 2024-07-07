"use client"

import { Input, inputForm } from "@/app/components/input";
import Button from "@/app/components/postButton";
import { useState } from "react";
import { update } from "./actions";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

interface productForm {
    title: string,
    description: string,
    price: number,
    photo: string,
    productId: number
}

export default function UpdateProduct({ title, description, price, photo, productId }: productForm) {
    const [image, setImage] = useState(photo);
    const [state, action] = useFormState(update, null);
    const {
        register,
        handleSubmit
    } = useForm<productForm>();
    const onSubmit = handleSubmit(async (data: productForm) => {
        const formData = new FormData();
        console.log(data);
        formData.append("productId", productId + '');
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price + '');
        formData.append("photo", image);
        await action(formData);
    })
    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = event;
        if (!files) return;
        const file = files[0];
        const url = URL.createObjectURL(file);
        setImage(url);
    }
    
    const onValid = async () => {
        await onSubmit();  
    }
    return <div>
        <form action={onValid} className="p-5 flex flex-col gap-5">
            <label htmlFor="photo" className="border-2 aspect-square
            flex flex-col items-center justify-center text-neutral-300
            rounded-md border-dashed cursor-pointer bg-center bg-cover" style={{
                    backgroundImage: `url(${image})`
                }}>
            </label>
            <input
                onChange={onImageChange}
                defaultValue={image}
                className="hidden"
                type="file"
                id="photo"
            />
            <input
                className={inputForm}
                type="text"
                required
                placeholder="제목"
                defaultValue={title}
                // errors={state?.fieldErrors.title}
                {...register("title")}
            />
            <input
                className={inputForm}
                type="number"
                required
                placeholder="가격"
                defaultValue={price}
                // errors={state?.fieldErrors.price}
                {...register("price")}
            />
            <input
                className={inputForm}
                type="text"
                required
                placeholder={description}
                defaultValue={description}
                // errors={state?.fieldErrors.description}
                {...register("description")}
            />
            <Button text="작성 완료" />
        </form>
    </div>
}