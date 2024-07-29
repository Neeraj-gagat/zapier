
export const ZapCell = ({
    name,
    index
}:{
    name?: string,
    index: number
}) => {
    return <div className="border border-black py-8 px-8 cursor-pointer w-[400px] flex justify-center max-w-md">
        <div className=" flex text-xl">
            <div className="font-bold">
            {index}.
            </div>
            <div>
            {name}
            </div>
        </div>
    </div>
}