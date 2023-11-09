import Link from "next/link"
import style from "./style.module.scss"

const Header = () => {
    return (
        <header className={style.header}>
            <div>
                <div className={style.logo}>
                    <h1>貸出管理システム</h1>
                </div>

                <div className={style.menu}>
                    <Link href="/">貸出状況</Link>
                    <Link href="/users">ユーザ</Link>
                    <Link href="/devices">機器</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;