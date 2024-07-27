
export const Input = ({lable, placeholder, onChange, type = "text"}:{
    lable:string,
    placeholder:string,
    onChange: (e:any) => void,
    type?: "text" | "password"
}) => {
    return <div>
        <div className="text-sm ">
           * <label> {lable}</label>
        </div>
        <input className="border rounded-sm px-4 py-2 w-full border-black" type={type} placeholder={placeholder} onChange={onChange} />
    </div>
}