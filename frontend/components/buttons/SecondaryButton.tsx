import { ReactNode } from "react";

export const SecondaryButton = ({children, onClick, size = "small"}: {
    children:ReactNode,
    onClick: () => void,
    size?: "big"|"small"}) => {
    return <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"}
    ${size === "small" ? "px-7 py-2" : "px-10 py-3"} hover:shadow-xl cursor-pointer border border-black rounded-full font-semibold text-black`}>
        {children}
    </div>
}