import { ReactNode } from "react";

export const PrimaryButton = ({children, onClick, size = "small"}: {
    children:ReactNode,
    onClick: () => void,
    size?: "big"|"small"}) => {
    return <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"}
    ${size === "small" ? "px-7 py-2" : "px-10 py-3"} font-medium hover:shadow-xl  cursor-pointer bg-amber-700 rounded-full text-center text-white`}>
        {children}
    </div>
}