"use client"
import DatePicker from "@/components/Inputs/DatePicker";
import TextInput from "@/components/Inputs/TextInput";
import style from "./style.module.scss"
import Button from "@/components/Button";
import { buttonStates } from "@/utility/states";
import Selectable from "@/components/Inputs/Selectable";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createOption, fetchAndSet } from "@/utility/utility"
import TextArea from "@/components/Inputs/TextArea";

const LendingEdit = ({ searchParams }: any) => {

    const [availableDevices, setAvailableDevices] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);

    const [rentalStart, setRentalStart] = useState("");
    const [rentalEnd, setRentalEnd] = useState("");
    const [deviceId, setDeviceId] = useState(1);
    const [userId, setUserId] = useState(1);
    const [remarks, setRemarks] = useState(null);

    const pathname = usePathname();

    useEffect(() => {
        const id = pathname.substring(pathname.lastIndexOf("&") + 1);

        setRentalStart(searchParams.rentalStart);
        setRentalEnd(searchParams.rentalEnd);
        setDeviceId(Number(searchParams.deviceId));
        setUserId(searchParams.userId);
        setRemarks(searchParams.remarks);

        fetchAndSet(`${process.env.API_PATH}/api/Device`, setAvailableDevices);
        fetchAndSet(`${process.env.API_PATH}/api/User/available`, setAvailableUsers);

    }, [pathname])



    const sendRequest = () => {

        fetch(`${process.env.API_PATH}/api/Lending`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                "rentalStart": rentalStart,
                "rentalEnd": rentalEnd,
                "deleteFlag": 0,
                "deviceId": deviceId,
                "userId": userId,
                "remarks": remarks
            })
        }).then((msg) => {
            console.log(msg);
        }).catch((err) => {
            console.error(err);
        })

    }

    const deviceOptions = availableDevices.map((device: any) => {
        return ({
            label: device.deviceId,
            value: device.id,
        });
    })

    const userOptions = availableUsers.map((user: any) => {
        return ({
            label: `${user.lastName} ${user.firstName}`,
            value: user.id,
        });
    })

    return (
        <form className={style.form}>

            <div>
                <DatePicker className={style.input} placeholder="貸出日" onChange={setRentalStart} initialValue={rentalStart} />
                <DatePicker className={style.input} placeholder="返却日" onChange={setRentalEnd} initialValue={rentalEnd} />
            </div>
            <div>
                <Selectable className={style.input} onChange={setDeviceId} initialValue={deviceId} options={deviceOptions} />
                <Selectable className={style.input} onChange={setUserId} initialValue={userId} options={userOptions} />
            </div>
            <div>
                <TextArea className={style.textarea} placeholder="備考" onChange={setRemarks} initialValue={remarks} />
            </div>

            <Button className={style.button} type={buttonStates.positive} text="貸出する" onClick={sendRequest} />
        </form>
    );
}

export default LendingEdit;