'use client'
import { useEffect, useState } from "react";
import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"

interface BinarySelectionProp {
    func: Function
    selectionA: string
    selectionB: string
    valA: any
    valB: any
    initialValue: any
    className: string
    label: string,
    warning?: string | boolean
}

const BinarySelection = ({ func = () => { }, selectionA, selectionB, valA, valB, initialValue, className, label, warning = false }: BinarySelectionProp) => {
    const [buttonASelected, setButtonASelected] = useState<boolean | null>(null);

    useEffect(() => {
        setButtonASelected(initialValue != null ? initialValue == valA : null);
    }, [initialValue])

    // console.log("Binary Selection ", initialValue)

    return (
        <div className={`${style.binaryinput} ${className} ${commonStyle.inputCommon}`}>
            <div className={commonStyle.labelWrapper}>
                <label>{label}</label><label style={warning ? { opacity: "1" } : { opacity: "0" }} className={commonStyle.warningLabel}>{warning}</label>
            </div>
            <div>
                <button onClick={(e) => { e.preventDefault(); func(valA); setButtonASelected(true); }}
                    className={`${warning ? commonStyle.warningOutline : ""} ${commonStyle.input} ${buttonASelected && buttonASelected != null ? style.selected : null}`}>{selectionA}</button>
                <button onClick={(e) => { e.preventDefault(); func(valB); setButtonASelected(false); }}
                    className={`${warning ? commonStyle.warningOutline : ""} ${commonStyle.input} ${!buttonASelected && buttonASelected != null ? style.selected : null}`}>{selectionB}</button>
            </div>
        </div>
    );
}

export default BinarySelection;