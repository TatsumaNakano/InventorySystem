import commonStyle from "@/components/styles/commom.module.scss"

const TextInput = ({ placeholder, type = "text" }: any) => {
    return <input className={commonStyle.input} placeholder={placeholder} type={type}></input>;
}

export default TextInput;