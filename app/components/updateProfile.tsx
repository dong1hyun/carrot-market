"use client"

import { useFormState } from "react-dom";
import { updateInfo } from "../(tabs)/profile/action";
import { Input_ } from "./input";

interface userInfoProps {
    username: string;
    phone: string | null;
    avatar: string | null;
}

export default function UpdateProfile({username, phone, avatar}: userInfoProps) {
    const [state, action] = useFormState(updateInfo, null);
    return <form action={action} className="mb-52 py-10 border-none">
        <h1 className="font-gothic text-5xl pb-10">내 정보 수정</h1>
        <div className="flex flex-col gap-5 *:rounded-md text-black">
            <Input_ name="username" required defaultValue={username} placeholder="이름" errors={state?.fieldErrors.username} />
            <Input_ name="password" type="password" required placeholder="비밀번호" errors={state?.fieldErrors.password}/>
            <Input_ name="phone" required defaultValue={phone ? phone : ""} placeholder="전화번호" errors={state?.fieldErrors.phone} />
            <Input_ name="avatar" required defaultValue={avatar ? avatar : ""} placeholder="프로필 이미지 링크" errors={state?.fieldErrors.avatar} />
            <button type="submit" className="bg-orange-500 rounded-md h-10 text-white">수정 완료</button>
        </div>
    </form>
}