// import UserDataTable from "@/components/UserDataTable";

import Button from "@/components/Button";
import UserToolbar from "@/components/UserToolbar";
import dynamic from "next/dynamic";
import Link from "next/link";

const UserDataDisplay = dynamic(() => import("../../components/UserDataDisplay"), { ssr: false });

const Users = () => {
    return (
        <div>
            <UserToolbar />
            <UserDataDisplay />
        </div>
    );
}

export default Users;