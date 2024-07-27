"use client"
import { useRouter } from "next/navigation"
import { LinkButton } from "./buttons/LinkButton"
import { PrimaryButton } from "./buttons/PrimaryButton";

export const AppBar = () => {
    const router = useRouter();
    return <div className="flex border-b justify-between p-3 px-10">
        <div className="flex flex-col justify-center font-extrabold text-3xl">
            _zapier
        </div>
        <div className="flex">
            <div className="pr-4">
            <LinkButton onClick={() =>{}}> Contact Sales </LinkButton>
            </div>
            <div className="pr-4">
            <LinkButton onClick={() =>{
                router.push("/login")
            }}> Log in </LinkButton>
            </div>
            <PrimaryButton onClick={() => {
                router.push("/signup")
            }}>
                Signup
            </PrimaryButton>
        </div>
    </div>
}