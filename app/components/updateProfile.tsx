"use client"

import { useFormState } from "react-dom";
import { updateInfo } from "../(tabs)/profile/action";

export default function UpdateProfile() {
    const [state, action] = useFormState(updateInfo, null);
    return <form action={action} className="mb-52 py-10">
        <h1 className="font-gothic text-5xl pb-10">내 정보 수정</h1>
        <div className="flex flex-col gap-5 *:rounded-md text-black">
            <input name="username" placeholder="이름" />
            <input name="password" placeholder="비밀번호" />
            <input name="phone" placeholder="전화번호" />
            <input name="avatar" placeholder="프로필 이미지" />
            <button type="submit" className="bg-orange-500 rounded-md h-10 text-white">수정 완료</button>
        </div>
    </form>
}