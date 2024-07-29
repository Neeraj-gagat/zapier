import { ReactNode } from "react";

export const DarkButton = ({children, onClick, size = "small"}: {
    children:ReactNode,
    onClick: () => void,
    size?: "big"|"small"}) => {
    return <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"}
    ${size === "small" ? "px-7 py-2" : "px-10 py-3"} font-medium hover:shadow-xl  cursor-pointer bg-blue-900 rounded text-center text-white`}>
        {children}
    </div>
}