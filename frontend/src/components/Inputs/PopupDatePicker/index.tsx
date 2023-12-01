"use client"
import commonStyle from "@/components/styles/commom.module.scss"
import { useEffect, useRef } from "react";

interface Props {
    label: string
    placeholder: string
    onChange: any
    initialValue: any
    className?: string
    warning?: string | boolean
}

const PopupDatePicker = ({ label, placeholder, onChange, className, warning = false }: Props) => {
    // const val = initialValue != null && initialValue != "" && initialValue.split != undefined ? initialValue.split("T")[0] : "";
    return (
        <div className={`${commonStyle.inputCommon} ${className}`}>
            <div className={commonStyle.labelWrapper}>
                <label>{label}</label><label style={warning ? { opacity: "1" } : { opacity: "0" }} className={commonStyle.warningLabel}>{warning}</label>
            </div>
            <input
                className={`${commonStyle.input}  ${warning ? commonStyle.warningOutline : ""}`}
                placeholder={placeholder}
                type="date"
                max={new Date().toISOString().split('T')[0]}
                onChange={onChange}
            // value={val}

            ></input >
        </div>
    )
}

export default PopupDatePicker;