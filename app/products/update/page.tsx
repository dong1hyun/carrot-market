"use client"

import { PhotoIcon } from "@heroicons/react/16/solid";
import  Input  from "@/app/components/input";
import Button from "@/app/components/postButton";
import { useState } from "react";
import { uploadProduct } from "./actions";
import { useFormState } from "react-dom";

export default function AddProduct() {
    const [preview, setPreview] = useState("");
    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = event;
        if(!files) return;
        const file = files[0];
        const url = URL.createObjectURL(file);
        setPreview(url);
    }
    const [state, action] = useFormState(uploadProduct, null);
    return <div>
        <form action={action} className="p-5 flex flex-col gap-5">
            <label htmlFor="photo" className="border-2 aspect-square
            flex flex-col items-center justify-center text-neutral-300
            rounded-md border-dashed cursor-pointer bg-center bg-cover" style={{
                backgroundImage: `url(${preview})`
                }}>
                {preview ? null : <>
                    <PhotoIcon className="w-20" />
                    <div className="text-neutral-400 text-sm">사진을 추가해주세요.{state?.fieldErrors.photo}</div>
                </>}
            </label>
            <input onChange={onImageChange} className="hidden" type="file" id="photo" name="photo" />
            <Input name="title" type="text" required placeholder="제목" errors={state?.fieldErrors.title} />
            <Input name="price" type="number" required placeholder="가격" errors={state?.fieldErrors.price} />
            <Input
                name="description"
                type="text"
                required
                placeholder="자세한 설명"
                errors={state?.fieldErrors.description}
            />
            <Button text="작성 완료" />
        </form>
    </div>
}