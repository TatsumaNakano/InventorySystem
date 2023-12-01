import Link from "next/link"
import style from "./style.module.scss"

const Header = () => {
    return (
        <>
            <header className={style.header}>
                <div>
                    <div className={style.logo}>
                        <Link href="/"><h1>貸出管理システム</h1></Link>
                    </div>

                    <div className={style.menu}>
                        <Link href="/">貸出状況</Link>
                        <Link href="/devices">機器一覧</Link>
                        <Link href="/users">ユーザ一覧</Link>

                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;