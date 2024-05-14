"use client";

import FormInput from "../components/input";
import FormButton from "../components/button";
import SocialLogin from "../components/social-login";
import { useFormState, useFormStatus } from "react-dom";
import { onSubmit } from "./action";

export default function Login() {
    const [ state, action ] = useFormState(onSubmit, null); //state는 action의 return 값
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요</h1>
                <h2 className="text-xl">Log in with email and password</h2>
            </div>
            <form action={action} className="flex flex-col gap-3">
                <FormInput
                    name="email"
                    type="email"
                    placeholder="Email"
                    required={true}
                    />
                <FormInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={true}
                    />
                <FormButton text="Log in" />
            </form>
            <SocialLogin />
        </div>
    )
}