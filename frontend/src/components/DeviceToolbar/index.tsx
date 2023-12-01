"use client"

import Link from "next/link";
import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"
import Button from "../Button";
import { buttonStates } from "@/utility/states";
import TextInput from "../Inputs/TextInput";
import { useState } from "react";

const DeviceToolbar = ({ setSearchString }: any) => {

    return (
        <div className={commonStyle.toolbar}>
            <h1>機器一覧</h1>
            <div>
                <Button className={style.button} type={buttonStates.positive} text="機器の新規登録" link="/devices/edit" />
                <TextInput placeholder="検索" onChange={setSearchString} noLabel />
            </div>
        </div>
    );
}

export default DeviceToolbar;