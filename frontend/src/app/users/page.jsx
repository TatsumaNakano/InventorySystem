// import UserDataTable from "@/components/UserDataTable";

import dynamic from "next/dynamic";

const UserDataTable = dynamic(() => import("../../components/UserDataTable"), { ssr: false });

const Users = () => {
    return (
        <div>
            <UserDataTable />
        </div>
    );
}

export default Users;