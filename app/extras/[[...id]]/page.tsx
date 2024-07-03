import Image from "next/image";
import star from "@/public/star.jpg" 

export default function Extras({params}: {params: {id: string[]}}) {
    return (
        <Image src={star} alt="" placeholder="blur" />
    )
}