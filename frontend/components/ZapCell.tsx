
export const ZapCell = ({
    name,
    index,
    onClick,
    image
}:{
    name?: string,
    index: number,
    onClick: () => void;
    image: string | undefined
}) => {
    return <div onClick={onClick} className="border border-black py-8 px-8 cursor-pointer w-[400px] flex justify-center max-w-md">
        <div className=" flex text-xl">
            <div className="font-bold">
            {index}.
            </div>
            <div>
            <img className=" flex justify-center" width={30} src={image} />
            </div>
            <div>
            { name}
            </div>
        </div>
    </div>
}