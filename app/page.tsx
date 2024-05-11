import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center 
    justify-between min-h-screen p-6">
      <div className="my-auto *:font-medium
      flex flex-col items-center gap-2">
        <span className="text-9xl">🥕</span>
        <h1 className="text-4xl">당근</h1>
        <h2 className="text-2xl">당근 마켓에 어서오세요!</h2>
      </div>
      <div className="flex flex-col items-center w-full gap-3">
        <Link className="w-full bg-orange-500 text-white
        text-lg font-medium py-2.5 rounded-md
        text-center hover:bg-orange-400 transition-colors" href="/create-account">시작하기</Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link className="hover:underline" href="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
}