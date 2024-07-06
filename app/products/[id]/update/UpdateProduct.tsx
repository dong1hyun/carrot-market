"use client"

import { PhotoIcon } from "@heroicons/react/16/solid";
import {Input} from "@/app/components/input";
import Button from "@/app/components/postButton";
import { useState } from "react";
import { update } from "./actions";
import { useFormState } from "react-dom";

interface productForm {
    title: string,
    description: string,
    price: number,
    photo: string,
    productId: number
}

export default function UpdateProduct({ title, description, price, photo, productId }: productForm) {
    const [image, setImage] = useState(photo);
    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = event;
        if (!files) return;
        const file = files[0];
        const url = URL.createObjectURL(file);
        setImage(url);
    }
    const [state, action] = useFormState(update, null);
    const handleSubmit = async (event: React.FormEvent) => {
        const productFormData = new FormData(event.target as HTMLFormElement);
        productFormData.append("productId", productId + '');
        productFormData.append("prevPhoto", photo);
        await action(productFormData);
    }
    return <div>
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-5">
            <label htmlFor="photo" className="border-2 aspect-square
            flex flex-col items-center justify-center text-neutral-300
            rounded-md border-dashed cursor-pointer bg-center bg-cover" style={{
                    backgroundImage: `url(${image})`
                }}>
            </label>
            <input onChange={onImageChange} defaultValue={image} className="hidden" type="file" id="photo" name="photo" />
            <Input name="title" type="text" required placeholder="제목" defaultValue={title} errors={state?.fieldErrors.title} />
            <Input name="price" type="number" required placeholder="가격" defaultValue={price} errors={state?.fieldErrors.price} />
            <Input
                name="description"
                type="text"
                required
                placeholder={description}
                defaultValue={description}
                errors={state?.fieldErrors.description}
            />
            <Button text="작성 완료" />
        </form>
    </div>
}