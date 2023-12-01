"use client"
import dynamic from "next/dynamic";
import DeviceToolbar from "@/components/DeviceToolbar"

import { useState } from "react";
import style from "./style.module.scss";

const DeviceDataDisplay = dynamic(() => import("../../components/DeviceDataDisplay"), { ssr: false })

const Devices = () => {

    const [searchString, setSearchString] = useState("");

    return (
        <div>
            <DeviceToolbar setSearchString={setSearchString} />
            <DeviceDataDisplay searchString={searchString} />
        </div>
    );
}

export default Devices;