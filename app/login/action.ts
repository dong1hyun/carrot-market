"use server";

export const onSubmit = async(prev: any, formData: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log(prev)
    console.log(formData)
    return {
        errors:["wrong password", "password is too short"]
    }
}