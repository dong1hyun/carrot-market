import { PhotoIcon } from "@heroicons/react/24/solid";
import { RxAvatar } from "react-icons/rx";

export default function Loading() {
    return (
        <div className="absolute items-center w-full h-full z-50 flex 
        justify-center bg-black left-0 top-0 bg-opacity-60">
            <div className="max-w-screen-sm h-1/2 flex justify-center w-full animate-pulse">
                <div className="relative aspect-square bg-neutral-700 
                text-neutral-200 rounded-xl
                flex justify-center items-center">
                    <PhotoIcon />
                </div>
                <div className="relative z-10 p-5">
                    <div className="border-b p-5 border-neutral-600 flex items-center gap-5">
                        <RxAvatar className="w-12 h-12" />
                        <div className="bg-neutral-700 w-16 h-5 rounded-md" />
                    </div>
                    <div>
                        <div className="bg-neutral-700 m-3 w-12 h-5 rounded-md" />
                        <div className="bg-neutral-700 m-3 w-32 h-5 rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
}
