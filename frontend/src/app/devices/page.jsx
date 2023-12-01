"use client"
import dynamic from "next/dynamic";
import DeviceToolbar from "@/components/DeviceToolbar"

import { useState } from "react";
import style from "./style.module.scss";

const DeviceDataDisplay = dynamic(() => import("../../components/DeviceDataDisplay"), { ssr: false })

const Devices = () => {

    const [searchString, setSearchString] = useState("");
    const [connected, setConnected] = useState(false);

    return (
        <div>
            {connected ? <DeviceToolbar setSearchString={setSearchString} /> : null}
            <DeviceDataDisplay searchString={searchString} onConnected={() => setConnected(true)} />
        </div>
    );
}

export default Devices;