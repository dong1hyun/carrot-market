import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
    id?:number
}

export default function getSession() {
    // iron session "delicious-karrot"이라는 쿠키가 있는지 찾고 없다면 생성해줌
    // cookie.id = user.id 그리고 쿠키 안에 정보를 넣고 save()로 저장함
    // 그럼 iron session이 우리가 넣은 password를 통해 암호화 함
    return getIronSession<SessionContent>(cookies(), {
        cookieName: "delicious-karrot",
        password: process.env.COOKIE_PASSWORD! //느낌표는 값이 무조건 존재한다는 것을 타입스크립트에게 알려주기 위함
    });
}