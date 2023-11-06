import Link from "next/link"

const Header = () => {
    return (
        <div>
            <Link href="/">Lending</Link>
            <Link href="/users">Users</Link>
            <Link href="/devices">Devices</Link>
        </div>
    );
}

export default Header;