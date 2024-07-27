"use client"
import { PrimaryButton } from "./buttons/PrimaryButton"
import { SecondaryButton } from "./buttons/SecondaryButton"

export const Hero = () => {
    return <div>
        <div className="flex justify-center">
            <div className="pt-20 text-6xl font-semibold text-center">
            Automate as fast as you can <br />
            {} type
            </div>
        </div>
        <div className="flex justify-center">
            <div className="text-center text-2xl font-medium pt-8 max-w-6xl ">AI gives you automation superpowers, and Zapier puts them to work. Pairing AI and Zapier <br /> helps you turn ideas into workflows and bots that work for you.
            </div>
        </div>

        <div className="flex justify-center pt-8">
            <div className="flex">
                    <PrimaryButton onClick={() => {}} size="big"> Get Started free</PrimaryButton>
                <div className="pl-4">
                    <SecondaryButton onClick={() => {}} size="big"> Start free with Google
                    </SecondaryButton>
                </div>
            </div>
        </div>
    </div>
    
}