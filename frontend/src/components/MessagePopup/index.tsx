"use client"
import { useEffect, useState } from "react";
import Button from "../Button";
import style from "./style.module.scss"
import { buttonStates } from "@/utility/states";
import { popupState } from "@/utility/recoilStates";
import { useRecoilState } from "recoil";


const MessagePopup = () => {
    const [popup, setPopup] = useRecoilState(popupState)

    useEffect(() => {
        if (popup != null && popup.state == messageStates.messageTimeout && popup != null) {
            setTimeout(() => {
                setPopup(null);
            }, 1000)
        }
    }, [popup])

    if (!popup) return


    return (
        <div className={style.messagePopup}>
            <div>
                <p>{popup.message}</p>
                <div>
                    {(popup.state == messageStates.needConfirm) ?
                        <Button className={style.button} type={buttonStates.positive} text={popup.confirmMsg} onClick={() => { popup.onConfirm(); setPopup(null); }} /> : null}

                    {(popup.state == messageStates.needSelection) ?
                        <>
                            <Button className={style.button} type={buttonStates.warning} text={popup.cancelMsg} onClick={() => { popup.onCancel(); setPopup(null); }} />
                            <Button className={style.button} type={buttonStates.positive} text={popup.confirmMsg} onClick={() => { popup.onConfirm(); setPopup(null); }} />
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
    messageTimeout: 2
}