
import Link from "next/link";
import { buttonStates } from "@/utility/states";
import style from "./style.module.scss";

interface ButtonInterface {
    type: string,
    text: string,
    link?: string | object,
    onClick?: any | null,
    className?: string,
    replace?: boolean
}

const Button = ({ type, text = "", link = "", onClick = null, className, replace = false }: ButtonInterface) => {

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

    const disable = link || onClick ? {} : { pointerEvents: "none" };

    return (
        <Link href={link} className={`${style.button} ${buttonStyle} ${className}`} style={disable as any} onClick={onClick}>
            {text}
        </Link>
    );
}

export default Button;