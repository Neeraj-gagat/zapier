"use client";

import { ReactNode } from "react"

export const LinkButton = ({children, onClick}:{ children: ReactNode, onClick: () => void }) => {
    return <div className=" flex justify-center px-2 py-2 rounded font-light text-sm cursor-pointer hover:bg-slate-100" onClick={onClick}>
        {children}
    </div>
}