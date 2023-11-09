import DatePicker from "@/components/Inputs/DatePicker";
import TextInput from "@/components/Inputs/TextInput";
import style from "./style.module.scss"
import Button from "@/components/Button";
import { buttonStates } from "@/utility/states";
import Selectable from "@/components/Inputs/Selectable";

const UserData = () => {
    return (
        <form className={style.form}>

            <div>
                <DatePicker placeholder="誕生日" />
                <TextInput placeholder="社員番号"></TextInput >
            </div>
            <div>
                <Selectable />
            </div>
            <div>
                <TextInput placeholder="名字"></TextInput>
                <TextInput placeholder="名前"></TextInput >
            </div>
            <div>
                <TextInput placeholder="カナ名前"></TextInput >
                <TextInput placeholder="カナ名前"></TextInput >
            </div>
            <div>
                <div><Selectable /></div>
                <div><Selectable /></div>
            </div>
            <div>
                <TextInput type="tel" placeholder="電話番号"></TextInput >
                <TextInput type="email" placeholder="メールアドレス"></TextInput >
            </div>
            <div>
                <TextInput placeholder="備考"></TextInput >
            </div>

            <input type="checkbox"></input>

            <Button type={buttonStates.positive} text="ユーザを登録する" link="/" />
        </form>
    );
}

export default UserData;