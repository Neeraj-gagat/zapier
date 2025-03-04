"use client"
import { AppBar } from "@/components/AppBar";
import { DarkButton } from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, WEBHOOK_URL } from "../config";
import { LinkButton } from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";

interface Zap {
    id: string,
    triggerId: string,
    userId: number,
    actions:{
        id: string,
        zapId: string,
        actionId: string,
        sortingOrder: number,
        type:{
            id:string,
            name:string,
            image: string
        }
    }[],
    trigger: {
        id: string,
        zapId: string,
        triggerId: string,
        type:{
            id: string,
            name: string,
            image: string
        }
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
            .then(res => {
                setZaps(res.data.zaps);
                setLoading(false);
            })
    }, []);

    return {
        loading, zaps
    }
}


export default function() {
    const { loading, zaps} = useZaps();
    const router = useRouter();

    return <div>
        <AppBar/>
        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg w-full">
                <div className="flex justify-between pr-8">
                    <div className="font-bold text-2xl">
                        My Zaps
                    </div>
                    <DarkButton onClick={() => {
                        router.push("/zap/create");
                    }} children={"+ Create"}/>
                </div>
            </div>
        </div>
        {loading ? "Loading...." : <div className="flex justify-center"><ZapTable zaps={zaps}/> </div>}
    </div>
}

function ZapTable({zaps}:{zaps:Zap[]}) {
    const router = useRouter(); 
    return  <div className="max-w-screen-lg pt-10  p-8 w-full">
            <div className="flex font-semibold pb-2">
                <div className="flex-1">Name</div>
                <div className="flex-1">ID</div>
                <div className="flex-1">Created on</div>
                <div className="flex-1">Webhook URL</div>
                <div className="flex-1">Go</div>
            </div>
            {zaps.map(z => <div className="flex border-b border-t py-4">
                <div className="flex-1 flex"> <img src={z.trigger.type.image} className=" w-[30px] h-[30px] mr-2"/>
                {z.actions.map(x => <img src={x.type.image} className="w-[30px] h-[30px] mr-2" />)}</div>
                <div className="flex-1">{z.id}</div>
                <div className="flex-1">Nov 13, 2023</div>
                <div className="flex-1">{`${WEBHOOK_URL}/hooks/catch/1/${z.id}`}</div>
                <div className="flex-1"><LinkButton onClick={() => {
                    router.push("/zap/" + z.id)
                }}>Go</LinkButton></div>
            </div>)}
        </div>

}