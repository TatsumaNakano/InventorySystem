import Link from "next/link";
import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"
import Button from "../Button";
import { buttonStates } from "@/utility/states";

const UserToolbar = () => {
    return (
        <div className={commonStyle.toolbar}>
            <Button type={buttonStates.positive} text="ユーザの新規登録" link="/users/new" />
        </div>
    );
}

export default UserToolbar;