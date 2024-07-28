"use client"
import { AppBar } from "@/components/AppBar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <div>
        <AppBar/> 
        <div className="flex justify-center">
            <div className="flex pt-8 px-10 max-w-5xl">
                <div className="flex-1 pt-20 px-4">
                    <div className="font-semibold text-gray-800 text-4xl pb-8">
                    Join millions worldwide who automate their work using Zapier. 
                    </div>
                    <div className="space-y-4">
                    <CheckFeature lable={"Easy setup, no coding required"} />
                    <CheckFeature lable={"Free forever for core features"} />
                    <CheckFeature lable={"14-day trial of premium features & apps"} />
                    </div>
                </div>
                <div className="flex-1 space-y-8 mt-12 pt-6 pb-6  px-4 ml-10 border ">
                <Input lable={"Name"} onChange={e => {
                    setName(e.target.value);
                }} type="text" placeholder="Your Name" />
                <Input lable={"Email"} onChange={e => {
                    setEmail(e.target.value);
                }} type="text" placeholder="Your Email" />
                <Input lable={"Password"} onChange={e => {
                    setPassword(e.target.value);
                }} type="password" placeholder="Your Password" />
                <PrimaryButton size="big" onClick={() => {
                    axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
                        email: email,
                        name: name,
                        password: password
                    });
                    router.push("/login")
                }} children={"Get Started free"}/>
            </div>
        </div>
    </div>
</div>
}