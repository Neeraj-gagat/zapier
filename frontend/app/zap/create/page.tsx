"use client";
import { AppBar } from "@/components/AppBar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ZapCell } from "@/components/ZapCell";
import { useState } from "react";

export default function(){
    const [selectedTrigger, setSelectedTrigger] = useState('');
    const [selectedActions, setSelectedActions] = useState<{
        availableAvtionId: string;
        availableAvtionName: string;
    }[]>([]);

    return <div>
        <AppBar/>
        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
            <div className="flex justify-center">
                <ZapCell name={selectedTrigger ? selectedTrigger : "Trigger"} index={1} />
            </div>
            <div className="pt-2 pb-2">
                {selectedActions.map((action, index) => <div className="flex justify-center pb-2 "><ZapCell name={action.availableAvtionName ? action.availableAvtionName : "Action"} index={2 + index} /> </div>)}
            </div>
            <div className="flex justify-center">
                <PrimaryButton onClick={() => {
                    setSelectedActions(a => [...a, {
                        availableAvtionId: "",
                        availableAvtionName: ""
                    }])
                }}><div className="text-2xl">
                    +
                </div></PrimaryButton>
            </div>
        </div>
    </div>
}