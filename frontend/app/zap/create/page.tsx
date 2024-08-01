"use client";
import { BACKEND_URL } from "@/app/config";
import { AppBar } from "@/components/AppBar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Input } from "@/components/Input";
import { ZapCell } from "@/components/ZapCell";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";

function useAvailableTriggersAndactions() {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/trigger/available`)
            .then(x => setAvailableTriggers(x.data.availableTriggers))

        axios.get(`${BACKEND_URL}/api/v1/action/available`)
            .then(x => setAvailableActions(x.data.availableActions))
        },[])
    return {
        availableActions,
        availableTriggers
    } 
}

export default function(){
    const router = useRouter(); 
    const {availableActions, availableTriggers} = useAvailableTriggersAndactions();
    const [selectedTrigger, setSelectedTriggers] = useState<{
        id:string;
        name:string;
        image: string;
    }>();

    const [selectedActions, setSelectedActions] = useState<{
        availableActionId: string;
        availableActionName: string;
        index:number;
        image: string;
        metadata: any;
    }[]>([]);
    const [selectedModalIndex, setSelectedModalIndex] = useState< null | number>(null);

    return <div>
        <AppBar/>
        <div className="flex justify-end bg-slate-200 pt-4 pr-10">
            <PrimaryButton onClick={ async () => {
                const res = await axios.post(`${BACKEND_URL}/api/v1/zap/`,{
                    "availableTriggerId": selectedTrigger?.id,
                    "triggerMetaData": {},
                    "actions": selectedActions.map(a => ({
                        availableActionId: a.availableActionId,
                        actionMetadata: a.metadata
                    }))
                }, {
                    headers:{
                        Authorization: localStorage.getItem("token")
                    }
                })
                router.push("/dashboard");

            }}>Publish</PrimaryButton>
        </div>
        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
            <div className="flex justify-center">
                <ZapCell onClick={() => {
                    setSelectedModalIndex(1)
                }} image={selectedTrigger?.image} name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"} index={1} />
            </div>
            <div className="pt-2 pb-2">
                {selectedActions.map((action) => <div className="flex justify-center pb-2 "><ZapCell 
                    onClick={() => {
                        setSelectedModalIndex(action.index)
                    }}
                    image={action.image}
                name={action.availableActionName ? action.availableActionName : "Action"} index={action.index} /> </div>)}
            </div>
            <div className="flex justify-center">
                <PrimaryButton onClick={() => {
                    setSelectedActions(a => [...a, {
                        index: a.length + 2,
                        availableActionId: "",
                        availableActionName: "",
                        image: "",
                        metadata: {}
                    }])
                }}><div className="text-2xl">
                    +
                </div></PrimaryButton>
            </div>
        </div>
        {selectedModalIndex && <Modal availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions} onSelect={(props: null | {name:string, image:string, id: string, metadata:any}) => {
            if (props === null) {
                setSelectedModalIndex(null);
                return;                
            }
            if (selectedModalIndex === 1) {
                setSelectedTriggers({
                    id: props.id,
                    name: props.name,
                    image: props.image
                })
            }else {
                setSelectedActions(a => {
                    let newActions = [...a];
                    newActions[selectedModalIndex -2] = {
                        availableActionId: props.id,
                        availableActionName: props.name,
                        index:selectedModalIndex,
                        image:props.image,
                        metadata: props.metadata
                    }
                    return newActions
                })
            }
            setSelectedModalIndex(null)
        }} index={selectedModalIndex}/>}
    </div>
}

function Modal({ index, onSelect, availableItems}:{ index:number, onSelect:(props: null | {name:string, image:string, id: string, metadata: any}) => void, availableItems:{id:string, name:string, image:string}[] }) {
    const [step, setStep] = useState(0);
    const [selectedAction, setSelectedAction] = useState<{
        id: string;
        name:string;
        image: string
    }>();
    const isTrigger = index === 1;

    return <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-100 bg-opacity-70 flex">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <div className="text-xl font-medium">
                    Select {index === 1 ? "Trigger" : "Action"}
                </div>
                <button onClick={() => {
                    onSelect(null);
                }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
                
            <div className="p-4 md:p-5 space-y-4">
                {/* {JSON.stringify(selectedAction)} */}
                {step === 1 && selectedAction?.id === "email" &&  <EmailSelector setMetaData={(metadata) => {
                    onSelect({
                        ...selectedAction,
                        metadata
                    })
                }} />}


                {(step === 1 && selectedAction?.id === "send-sol") &&  <SolanaSelector setMetaData={(metadata) => {
                    onSelect({
                        ...selectedAction,
                        metadata
                    })
                }} />}


                {step === 0 && <div> {availableItems.map(({id, name, image}) => {
                    return <div onClick={() => {
                        if (isTrigger) {
                            onSelect({
                                id,
                                name,
                                image,
                                metadata: {}
                            })        
                        }else {
                            setStep(s => s + 1)
                            setSelectedAction({
                                id,
                                name,
                                image
                            })
                        }
                    
                    }} className="flex border p-4 cursor-pointer hover:bg-slate-100">
                        <img src={image} width={30} className="rounded-full"/> <div className="flex flex-col justify-center"> {name} </div>
                    </div>
                })}</div>}
                
            </div>
        </div>
    </div>
</div>
}

function EmailSelector({setMetaData}: {
    setMetaData: (params:any) => void
}) {
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    return <div>
        <Input lable={"To"} type={"text"} placeholder="To" onChange={(e) => setEmail(e.target.value)} ></Input>
        <Input lable={"Body"} type={"text"} placeholder="Body" onChange={(e) => setBody(e.target.value)}></Input>
        <div className="pt-4">
        <PrimaryButton onClick={() => {
            setMetaData({
                email,
                body
            })
        }}>Submit</PrimaryButton>
    </div>
    </div>
}


function SolanaSelector({setMetaData}: {
    setMetaData: (params:any) => void
}) {
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");

    return <div>
        <Input lable={"Address"} type={"text"} placeholder="To" onChange={(e) => setAddress(e.target.value)} ></Input>
        <Input lable={"Amount"} type={"text"} placeholder="To" onChange={(e) => setAmount(e.target.value)} ></Input>
        <div className="pt-4">
        <PrimaryButton onClick={() => {
            setMetaData({
                amount,
                address
            })
        }}>Submit</PrimaryButton>
    </div>
    </div>
}