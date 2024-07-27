"use client"
import { AppBar } from "@/components/AppBar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";

export default function() {
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
                <Input lable={"Name"} onChange={e => {}} type="text" placeholder="Your Name" />
                <Input lable={"Email"} onChange={e => {}} type="text" placeholder="Your Email" />
                <Input lable={"Password"} onChange={e => {}} type="password" placeholder="Your Password" />
                <PrimaryButton size="big" onClick={() => {}} children={"Get Started free"}/>
            </div>
        </div>
    </div>
</div>
}