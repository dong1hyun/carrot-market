import { InputHTMLAttributes } from "react";

interface InputProps {
    errors?: string[];
    name: string;
}

export function Input({ name, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLElement>) {
    return (
        <div className="flex flex-col gap-2">
            <input className="bg-transparent rounded-md w-full h-10 
                    focus:outline-none ring-1 focus:ring-4 transition ring-neutral-200
                    focus:ring-orange-500 border-none placeholder:text-neutral-400"
                {...rest} name={name} />
            {errors.map((error, index) => <span key={index} className="text-red-500 font-medium">{error}</span>)}
        </div>
    )
}

export function Input_({ name, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLElement>) {
    return (
        <div className="flex flex-col gap-2">
            <input className="bg-transparent rounded-md w-full h-10 text-white
                    focus:outline-none ring-1 focus:ring-4 transition ring-neutral-200
                    focus:ring-orange-500 border-none placeholder:text-neutral-400"
                {...rest} name={name} />
            {errors.map((error, index) => <span key={index} className="text-red-500 font-medium">{error}</span>)}
        </div>
    )
}