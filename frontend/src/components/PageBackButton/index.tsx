import Link from "next/link";
import style from "./style.module.scss";

const PageBackButton = ({ text, href }: any) => {
    return (
        <Link className={style.pageBackButton} href={href}>{text}</Link>
    );
}

export default PageBackButton;