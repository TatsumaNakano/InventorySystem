"use client"
import Creatable, { useCreatable } from "react-select/creatable"
import commonStyle from "@/components/styles/commom.module.scss"
import style from "./style.module.scss"
import { useEffect, useState } from "react"
import { SelectableOption } from "@/utility/interfaces"

interface Selectable {
    className: string
    onChange: Function
    options: Array<SelectableOption>
    initialValue: any
    label: string
    noValueLabel?: string
    warning?: string | boolean
    disabled?: Boolean,
    action?: Function | null,
    actionDelete?: Function | null,
    actionLabel?: string | null,
    hideDeleteButton?: boolean
}

const Selectable = ({ className = "", onChange, options, initialValue, label, noValueLabel = "", warning = false, disabled = false, action = null, actionDelete = null, actionLabel = null, hideDeleteButton = false }: Selectable) => {
    const [selectedValue, setSelectedValue] = useState(initialValue);
    const actionVal = "action";

    useEffect(() => {
        setSelectedValue(initialValue);

    }, [initialValue]);

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        console.log(newValue)
        if (onChange && newValue != actionVal) {
            onChange(newValue);
            setSelectedValue(newValue);
        }

        if (newValue == actionVal && action) {
            action();
        }
    };

    // const pointerStyle = disabled ? { pointerEvent: "none" } : {}

    return (
        <div className={`${commonStyle.inputCommon} ${className}`}>
            <div className={commonStyle.labelWrapper}>
                <label>{label}</label><label style={warning ? { opacity: "1" } : { opacity: "0" }} className={commonStyle.warningLabel}>{warning}</label>
            </div>
            <div className={style.selectable}>
                <select disabled={disabled as any} className={`${commonStyle.input}  ${warning ? commonStyle.warningOutline : ""}`} value={selectedValue ? selectedValue : -1} onChange={handleOnChange}>
                    {noValueLabel ? <option value={-1}>{noValueLabel}</option> : null}
                    {options.map((option: any) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}

                    {action != null && actionLabel != null ? <option value={actionVal}>{actionLabel}</option> : null}

                </select>
                {selectedValue != -1 && actionDelete && !hideDeleteButton ? <button onClick={(e) => { e.preventDefault(); actionDelete(selectedValue) }} className={style.deleteButton}>×</button> : null}
            </div>
        </div>
    );
};




export default Selectable;