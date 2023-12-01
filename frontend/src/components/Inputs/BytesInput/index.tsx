import commonStyle from "@/components/styles/commom.module.scss"
import { useEffect, useRef, useState } from "react";
import Selectable from "../Selectable";
import style from "./style.module.scss"

interface prop {
    label: string,
    onChange: Function,
    initialValue: number | null,
    noValueLabel: string,
    className: string,
    warning: boolean | string
}

const BytesInput = ({ label, onChange, initialValue, noValueLabel, className, warning = false }: prop) => {

    const [initialized, setInitialized] = useState(false);
    const [inputVal, setInputVal] = useState<number | null>(null)
    const [selectedBytes, setSelectedBytes] = useState<number | null>(initialValue);

    ////////////////////////////
    // 初期化
    ////////////////////////////
    useEffect(() => {
        // if (!initialized)
        if (initialValue != null && !initialized) {
            //MB
            if (initialValue < byteStates.gb.value) {
                setInputVal(initialValue);
                setSelectedBytes(byteStates.mb.value);
            }
            //GB
            else if (initialValue >= byteStates.gb.value && initialValue < byteStates.tb.value) {
                setInputVal(initialValue / byteStates.gb.value);
                setSelectedBytes(byteStates.gb.value);

            }
            //TB
            else if (initialValue >= byteStates.tb.value && initialValue < byteStates.pb.value) {
                setInputVal(initialValue / byteStates.tb.value);
                setSelectedBytes(byteStates.tb.value);

            }
            //PB
            else if (initialValue > byteStates.pb.value) {
                setInputVal(initialValue / byteStates.pb.value);
                setSelectedBytes(byteStates.pb.value);
            }
            setInitialized(true);
        } else {//もし初期値が指定されていない場合
            setSelectedBytes(byteStates.mb.value)
        }

    }, [initialValue]);

    const onInputNumber = (e: any) => {
        const newVal = e.target.value as number;
        // console.log("newVal", newVal)
        setInputVal(newVal);

        if (selectedBytes != null) {
            onChange(newVal * selectedBytes);
        }
    }

    const onSelectBytes = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSelection: number = Number(e.target.value);
        // console.log("newSelection", newSelection);
        setSelectedBytes(newSelection);
        if (inputVal) {
            onChange(inputVal * newSelection);
        }
    };

    var optionArr = [];
    for (const key in byteStates) {
        const val = byteStates[key as keyof typeof byteStates].value;
        const label = byteStates[key as keyof typeof byteStates].label;
        optionArr.push(<option value={val} key={val}>{label}</option>);
    }

    return (
        <div className={`${commonStyle.inputCommon} ${className}`}>

            <div className={commonStyle.labelWrapper}>
                <label>{label}</label>
                <label style={warning ? { opacity: "1" } : { opacity: "0" }} className={commonStyle.warningLabel}>{warning}</label>
            </div>

            <div className={`${style.inputWrapper}`}>
                <input
                    className={`${commonStyle.input} ${warning ? commonStyle.warningOutline : ""}`}
                    placeholder={"例）500"}
                    type={"number"}
                    onChange={onInputNumber}
                    onBlur={onInputNumber}
                    defaultValue={inputVal != null ? inputVal : undefined}
                />
                <select className={`${commonStyle.input}  ${warning ? commonStyle.warningOutline : ""}`} value={selectedBytes ? selectedBytes : -1} onChange={onSelectBytes}>
                    {/* {noValueLabel ? <option value={-1}>{noValueLabel}</option> : null} */}
                    {/* {byteStates.map((option: any) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))} */}

                    {optionArr}
                </select>
            </div>
        </div>
    )
}

export default BytesInput;


interface ByteState {
    label: string;
    value: number;
}

const byteStates = {
    mb: {
        label: "MB",
        value: 1
    },
    gb: {
        label: "GB",
        value: 1024

    },
    tb: {
        label: "TB",
        value: 1024000,
    },
    pb: {
        label: "PB",
        value: 1024000000
    }
}