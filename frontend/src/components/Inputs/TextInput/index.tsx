import commonStyle from "@/components/styles/commom.module.scss"
import { useRef, useState } from "react";

const TextInput = ({ label, placeholder, type = "text", onChange, initialValue, className, warning = false, regex = /.*/ }: any) => {

    const [inputVal, setInputVal] = useState("")

    const onInput = (e: any) => {
        const inputVal = e.target.value;
        // console.log("inputVal", inputVal);
        onChange(inputVal);
    }

    // console.log("warning", warning);

    return (<div className={`${commonStyle.inputCommon} ${className}`}>
        <div className={commonStyle.labelWrapper}>
            <label>{label}</label><label style={warning ? { opacity: "1" } : { opacity: "0" }} className={commonStyle.warningLabel}>{warning}</label>
        </div>
        <input
            className={`${commonStyle.input} ${warning ? commonStyle.warningOutline : ""}`}
            placeholder={placeholder}
            type={type}
            onChange={onInput}
            onBlur={onInput}
            defaultValue={initialValue}
        ></input>
    </div>)
}

export default TextInput;