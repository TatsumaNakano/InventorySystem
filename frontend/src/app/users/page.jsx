"use client"

import Button from "@/components/Button";
import UserToolbar from "@/components/UserToolbar";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

const UserDataDisplay = dynamic(() => import("../../components/UserDataDisplay"), { ssr: false });

const Users = () => {
    const [searchString, setSearchString] = useState("");

    return (
        <div>
            <UserToolbar setSearchString={setSearchString} />
            <UserDataDisplay searchString={searchString} />
        </div>
    );
}

export default Users;