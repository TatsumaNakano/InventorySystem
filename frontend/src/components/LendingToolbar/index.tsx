// "use client"

import Link from "next/link";
import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"
import Button from "../Button";
import { buttonStates } from "@/utility/states";

const LendingToolbar = () => {
    return (
        <div className={commonStyle.toolbar}>
            <h1>貸し出し状況</h1>
            <div>
                <Button className={style.button} type={buttonStates.positive} text="新規貸出" link="/lendings/edit" />
            </div>
        </div>
    );
}

export default LendingToolbar;