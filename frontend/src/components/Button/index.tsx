import Link from "next/link";
import { buttonStates } from "@/utility/states";
import style from "./style.module.scss";

interface ButtonInterface {
    type: string,
    text: string,
    link: string
}

const Button = ({ type, text = "", link = "/" }: ButtonInterface) => {

    var buttonStyle = (() => {
        switch (type) {
            case buttonStates.positive:
                return style.positive;
            case buttonStates.warning:
                return style.warning;
            case buttonStates.detail:
                return style.detail;
            case buttonStates.disabled:
                return style.disabled;
            default:
                return style.detail;
        }
    })();

    return (
        <Link href={link} className={`${style.button} ${buttonStyle}`}>
            {text}
        </Link>
    );
}

export default Button;