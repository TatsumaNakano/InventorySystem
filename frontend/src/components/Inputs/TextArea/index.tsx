import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"

const TextArea = ({ label, placeholder, onChange, initialValue, className }: any) => {
    return (<div className={`${commonStyle.inputCommon} ${className}`}>
        <label>{label}</label>
        <textarea
            className={`${commonStyle.input} ${style.textarea}`}
            placeholder={placeholder}
            onChange={(e: any) => { onChange(e.target.value); }}
            onBlur={(e: any) => { onChange(e.target.value); }}
            defaultValue={initialValue}
        ></textarea>
    </div>)
}

export default TextArea;