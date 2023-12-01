"use client"
import commonStyle from "@/components/styles/commom.module.scss"
import { useEffect, useRef } from "react";

interface Props {
    label: string
    placeholder: string
    onChange: Function
    initialValue: any
    className?: string
    warning?: string | boolean,
    max?: string,
    disabled?: boolean
}

const DatePicker = ({ label, placeholder, onChange, initialValue, className, warning = false, max = "", disabled = false }: Props) => {
    const val = initialValue != null && initialValue != "" && initialValue.split != undefined ? initialValue.split("T")[0] : "";
    return (
        <div className={`${commonStyle.inputCommon} ${className}`}>
            <div className={commonStyle.labelWrapper}>
                <label>{label}</label><label style={warning ? { opacity: "1" } : { opacity: "0" }} className={commonStyle.warningLabel}>{warning}</label>
            </div>
            <input
                className={`${commonStyle.input}  ${warning ? commonStyle.warningOutline : ""}`}
                placeholder={placeholder}
                type="date"
                readOnly={disabled as any}
                onChange={(e: any) => onChange(e.target.value + "T00:00:00")}
                value={val}

            ></input >
        </div>
    )
}

export default DatePicker;