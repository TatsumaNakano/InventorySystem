"use client"
import { useEffect, useState } from "react";
import Button from "../Button";
import style from "./style.module.scss"
import { buttonStates } from "@/utility/states";
import { popupState } from "@/utility/recoilStates";
import { useRecoilState } from "recoil";
import PopupDatePicker from "../Inputs/PopupDatePicker";
import TextArea from "../Inputs/TextArea";
import TextInput from "../Inputs/TextInput";
import EmojiPicker from "../Inputs/EmojiPicker";


const MessagePopup = () => {
    const [popup, setPopup] = useRecoilState(popupState)

    useEffect(() => {
        if (popup != null && popup.state == messageStates.messageTimeout && popup != null) {
            setTimeout(() => {
                setPopup(null);
            }, 1000)
        }
        console.log(popup)
    }, [popup])


    if (!popup) return

    return (
        <div className={style.messagePopup}>
            <div>
                <p>{popup.message}</p>
                {(popup.state == messageStates.needDateInput) ?
                    <div className={style.dateInputWrapper}>
                        <PopupDatePicker className={style.datepicker} label={"退社日"} placeholder={"退社日"} onChange={popup.onChange} initialValue={null} />
                    </div> : null
                }
                {(popup.state == messageStates.needDetailInput) ?
                    <TextArea label="備考に追加されます。" className={style.textArea} onChange={popup.onChange} /> : null
                }
                {(popup.state == messageStates.needStringInput) ?
                    <TextInput label={popup.labelText} className={style.textInput} onChange={popup.onChange} placeholder={popup.placeholder} /> : null
                }
                {(popup.state == messageStates.needEmojiInput) ?
                    <div className={style.emojiInput}>
                        {/* {popup.selectedValue} */}
                        <EmojiPicker onChange={popup.onChange} />
                    </div> : null
                }
                <div>
                    {(popup.state == messageStates.needConfirm) ?
                        <Button className={style.button} type={buttonStates.positive} text={popup.confirmMsg} onClick={() => { popup.onConfirm(); }} /> : null}

                    {(popup.state == messageStates.needSelection ||
                        popup.state == messageStates.needDateInput ||
                        popup.state == messageStates.needDetailInput ||
                        popup.state == messageStates.needStringInput ||
                        popup.state == messageStates.needEmojiInput) ?
                        <>
                            <Button className={style.button} type={buttonStates.warning} text={popup.cancelMsg} onClick={() => { popup.onCancel(); }} />
                            <Button className={style.button} type={buttonStates.positive} text={popup.confirmMsg} onClick={() => { popup.onConfirm(); }} />
                        </>
                        : null}
                </div>
            </div>
        </div>
    );
}

export default MessagePopup;


export const messageStates = {
    needConfirm: 0,
    needSelection: 1,
    messageTimeout: 2,
    needDateInput: 3,
    needDetailInput: 4,
    needStringInput: 5,
    needEmojiInput: 6
}