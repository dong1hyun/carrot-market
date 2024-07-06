"use client"

import { Input } from "../../components/input";
import FormButton from "../../components/postButton";
import SocialLogin from "../../components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

export default function CreateAccount() {
    const [state, action] = useFormState(createAccount, null)
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요</h1>
                <h2 className="text-xl">Fill in the form below to join!</h2>
            </div>
            <form action={action} className="flex flex-col gap-3">
                <Input
                    name="username"
                    type="text"
                    placeholder="username"
                    required={true}
                    minLength={3}
                    maxLength={10}
                    errors={state?.fieldErrors.username}
                    />
                <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required={true}
                    errors={state?.fieldErrors.email}
                    />
                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={true}
                    minLength={4}
                    errors={state?.fieldErrors.password}
                    />
                <Input
                    name="confirm_password"
                    type="password"
                    placeholder="Password Confirm"
                    required={true}
                    // minLength={4}
                    errors={state?.fieldErrors.confirm_password}
                    />
                <FormButton text="Create Account" />
            </form>
            <SocialLogin />
        </div>
    )
}