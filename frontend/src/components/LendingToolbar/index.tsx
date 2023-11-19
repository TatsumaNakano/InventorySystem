// "use client"

import Link from "next/link";
import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"
import Button from "../Button";
import { buttonStates } from "@/utility/states";

const LendingToolbar = () => {
    return (
        <div className={commonStyle.toolbar}>
            <Button className={style.button} type={buttonStates.positive} text="新規貸出" link="/lendings/edit" />
        </div>
    );
}

export default LendingToolbar;