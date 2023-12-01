// "use client"

import Link from "next/link";
import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"
import Button from "../Button";
import { buttonStates } from "@/utility/states";
import TextInput from "../Inputs/TextInput";

const UserToolbar = ({ setSearchString }: any) => {
    return (
        <div className={commonStyle.toolbar}>
            <h1>ユーザ一覧</h1>
            <div>
                <Button className={style.button} type={buttonStates.positive} text="ユーザの新規登録" link="/users/edit" />
                <TextInput onChange={setSearchString} placeholder="検索" noLabel />
            </div>
        </div>
    );
}

export default UserToolbar;